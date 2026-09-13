'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Camera, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { trackFormSubmit } from '@/lib/tracking';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Message {
  rol: 'USER' | 'BOT';
  contenido: string;
  options?: string[];
}

const SERVICE_OPTIONS = [
  'Reforma integral',
  'Reforma de baño',
  'Reforma de cocina',
  'Electricidad',
  'Fontanería',
  'Climatización',
  'Arquitecto / técnico',
  'Pequeñas obras',
  'No lo sé',
];

const URGENCY_OPTIONS = ['Es urgente', 'Puedo esperar', 'No estoy seguro'];

interface ChatFlowProps {
  onClose: () => void;
}

export default function ChatFlow({ onClose }: ChatFlowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      rol: 'BOT',
      contenido:
        '¡Hola! Soy el asistente de Anaid Grupo. ¿En qué podemos ayudarte?',
      options: SERVICE_OPTIONS,
    },
  ]);
  const [paso, setPaso] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [chatData, setChatData] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (rol: 'USER' | 'BOT', contenido: string, options?: string[]) => {
    setMessages((prev) => [...prev, { rol, contenido, options }]);
  };

  const handleOptionClick = (option: string) => {
    addMessage('USER', option);

    if (paso === 1) {
      setChatData((prev) => ({ ...prev, tipoServicio: option }));
      setTimeout(() => {
        addMessage(
          'BOT',
          '¿Es urgente o puedes esperar unos días?',
          URGENCY_OPTIONS
        );
        setPaso(2);
      }, 500);
    } else if (paso === 2) {
      setChatData((prev) => ({ ...prev, urgencia: option }));
      setTimeout(() => {
        addMessage('BOT', 'Cuéntanos brevemente qué necesitas:');
        setShowInput(true);
        setPaso(3);
      }, 500);
    }
  };

  const handleSubmitInput = () => {
    if (!inputValue.trim()) return;
    const value = inputValue.trim();
    setInputValue('');

    addMessage('USER', value);

    if (paso === 3) {
      setChatData((prev) => ({ ...prev, descripcion: value }));
      setShowInput(true);
      setTimeout(() => {
        addMessage('BOT', '¿En qué zona de Madrid te encuentras? (código postal)');
        setPaso(4);
      }, 500);
    } else if (paso === 4) {
      setChatData((prev) => ({ ...prev, codigoPostal: value }));
      setTimeout(() => {
        addMessage(
          'BOT',
          'Para que un profesional pueda contactarte, necesitamos tu nombre, teléfono y email. Escríbelos separados por comas:'
        );
        setPaso(5);
      }, 500);
    } else if (paso === 5) {
      const parts = value.split(',').map((s) => s.trim());
      setChatData((prev) => ({
        ...prev,
        nombre: parts[0] || '',
        telefono: parts[1] || '',
        email: parts[2] || '',
      }));
      setTimeout(() => {
        addMessage(
          'BOT',
          '¿Quieres adjuntar fotos del espacio? Puedes saltarte este paso.',
          ['Continuar sin fotos']
        );
        setShowInput(false);
        setPaso(6);
      }, 500);
    }
  };

  const handleSkipPhotos = () => {
    addMessage('USER', 'Continuar sin fotos');
    finishChat();
  };

  const finishChat = async () => {
    const data = chatData;
    setShowInput(false);
    setCompleted(true);

    addMessage(
      'BOT',
      `¡Gracias, ${data.nombre || 'usuario'}! Hemos recibido tu solicitud. Analizaremos tu proyecto y te contactaremos en breve para asignarte el profesional adecuado.`
    );

    // Attempt to submit lead
    try {
      const urgenciaMap: Record<string, string> = {
        'Es urgente': 'URGENTE',
        'Puedo esperar': 'BAJA',
        'No estoy seguro': 'MEDIA',
      };

      const tipoMap: Record<string, string> = {
        'Reforma integral': 'REFORMA_INTEGRAL',
        'Reforma de baño': 'REFORMA_BANO',
        'Reforma de cocina': 'REFORMA_COCINA',
        'Electricidad': 'ELECTRICIDAD',
        'Fontanería': 'FONTANERIA',
        'Climatización': 'CLIMATIZACION',
        'Arquitecto / técnico': 'ARQUITECTO',
        'Pequeñas obras': 'PEQUENAS_OBRAS',
        'No lo sé': 'NO_SE',
      };

      await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: data.nombre || 'Chat lead',
          telefono: data.telefono || '',
          email: data.email || '',
          codigoPostal: data.codigoPostal || '',
          descripcion: data.descripcion || '',
          urgencia: urgenciaMap[data.urgencia] || 'MEDIA',
          tipoServicio: tipoMap[data.tipoServicio] || 'NO_SE',
          fuente: 'CHAT',
        }),
      });

      const service = tipoMap[data.tipoServicio] || 'NO_SE';
      trackFormSubmit({
        form_location: 'chat-guiado',
        service,
      });
      router.push(`/gracias/chat?service=${encodeURIComponent(service)}`);
    } catch {
      // Silently fail — the lead data is captured
    }
  };

  return (
    <div className="flex flex-col h-[400px] sm:h-[450px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i}>
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-xl text-sm ${
                msg.rol === 'BOT'
                  ? 'bg-muted text-foreground rounded-bl-sm'
                  : 'bg-primary text-white ml-auto rounded-br-sm'
              }`}
            >
              {msg.contenido}
            </div>

            {/* Option buttons */}
            {msg.rol === 'BOT' && msg.options && !completed && i === messages.length - 1 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {msg.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() =>
                      paso === 6 ? handleSkipPhotos() : handleOptionClick(opt)
                    }
                    className="px-3 py-1.5 text-xs font-medium rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {completed && (
          <div className="flex items-center gap-2 text-sm text-success font-medium">
            <Check className="w-4 h-4" />
            Solicitud enviada correctamente
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      {showInput && !completed && (
        <div className="border-t border-border p-3 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitInput()}
            placeholder="Escribe aquí..."
            className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:border-primary focus:outline-none"
          />
          <button
            onClick={handleSubmitInput}
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            aria-label="Enviar"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      )}

      {completed && (
        <div className="border-t border-border p-3">
          <Button href="/solicitar-proyecto" size="sm" fullWidth>
            Ver formulario completo
          </Button>
        </div>
      )}
    </div>
  );
}
