import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ChatbotService {
  constructor(private readonly prisma: PrismaService) {}

  async startSession(): Promise<{ sessionToken: string }> {
    const session = await this.prisma.chatSession.create({
      data: {},
    });

    // Send initial bot greeting
    await this.prisma.chatMensaje.create({
      data: {
        chatSessionId: session.id,
        rol: 'BOT',
        contenido:
          '¡Hola! Soy el asistente de Anaid Grupo. Te ayudaré a solicitar un presupuesto para tu reforma o servicio. ¿Qué tipo de servicio necesitas?',
        paso: 0,
      },
    });

    return { sessionToken: session.sessionToken };
  }

  async processMessage(
    sessionToken: string,
    mensaje: string,
    paso: number,
  ): Promise<{ respuesta: string; paso: number; completado: boolean }> {
    const session = await this.prisma.chatSession.findUnique({
      where: { sessionToken },
    });

    if (!session) {
      throw new NotFoundException('Sesión no encontrada');
    }

    // Save user message
    await this.prisma.chatMensaje.create({
      data: {
        chatSessionId: session.id,
        rol: 'USER',
        contenido: mensaje,
        paso,
      },
    });

    let respuesta = '';
    let completado = false;

    switch (paso) {
      case 1:
        respuesta =
          'Perfecto. Estos son los tipos de servicio que ofrecemos:\n' +
          '1. Reforma integral\n' +
          '2. Reforma de baño\n' +
          '3. Reforma de cocina\n' +
          '4. Electricidad\n' +
          '5. Fontanería\n' +
          '6. Climatización\n' +
          '7. Arquitecto\n' +
          '8. Pequeñas obras\n' +
          '9. No estoy seguro/a\n\n' +
          'Indica el número o nombre del servicio que necesitas.';
        break;

      case 2:
        respuesta =
          '¿Cuál es la urgencia de tu proyecto?\n' +
          '1. Urgente (lo antes posible)\n' +
          '2. Alta (esta semana)\n' +
          '3. Media (este mes)\n' +
          '4. Baja (sin prisa, estoy planificando)';
        break;

      case 3:
        respuesta =
          'Gracias. Por favor, describe brevemente lo que necesitas: ' +
          '¿qué quieres hacer, en qué espacio, y algún detalle relevante?';
        break;

      case 4:
        respuesta =
          'Entendido. ¿Cuál es tu código postal? ' +
          'Esto nos ayuda a asignarte profesionales de tu zona.';
        break;

      case 5:
        respuesta =
          '¡Genial! Ahora necesitamos tus datos de contacto. ' +
          'Por favor, indícanos tu nombre, email y teléfono.';
        break;

      case 6:
        respuesta =
          '¿Tienes fotos del espacio o del problema? ' +
          'Puedes subirlas ahora o más adelante. ' +
          'Escribe "no" si prefieres continuar sin fotos.';
        break;

      case 7: {
        // Generate summary and create lead from chat data
        const messages = await this.prisma.chatMensaje.findMany({
          where: { chatSessionId: session.id, rol: 'USER' },
          orderBy: { creadoEn: 'asc' },
        });

        const chatData = this.extractChatData(messages);

        // Create lead from chat data
        const lead = await this.prisma.lead.create({
          data: {
            nombre: chatData.nombre || 'Sin nombre',
            telefono: chatData.telefono || '',
            email: chatData.email || '',
            codigoPostal: chatData.codigoPostal || '',
            descripcion: chatData.descripcion || 'Solicitud via chat',
            urgencia: chatData.urgencia as any || 'MEDIA',
            tipoServicio: chatData.tipoServicio as any || 'NO_SE',
            fuente: 'CHAT',
          },
        });

        // Link session to lead and mark completed
        await this.prisma.chatSession.update({
          where: { id: session.id },
          data: {
            leadId: lead.id,
            completado: true,
            resumen: `Servicio: ${chatData.tipoServicio || 'No especificado'}, Urgencia: ${chatData.urgencia || 'MEDIA'}`,
          },
        });

        respuesta =
          '¡Gracias! Tu solicitud ha sido registrada correctamente. ' +
          'Un profesional se pondrá en contacto contigo lo antes posible. ' +
          'Tu número de referencia es: ' +
          lead.id.substring(0, 8).toUpperCase();
        completado = true;
        break;
      }

      default:
        respuesta = 'No entendí tu mensaje. ¿Podrías intentarlo de nuevo?';
    }

    // Save bot response
    await this.prisma.chatMensaje.create({
      data: {
        chatSessionId: session.id,
        rol: 'BOT',
        contenido: respuesta,
        paso,
      },
    });

    return { respuesta, paso, completado };
  }

  async getSession(sessionToken: string) {
    const session = await this.prisma.chatSession.findUnique({
      where: { sessionToken },
      include: {
        mensajes: { orderBy: { creadoEn: 'asc' } },
      },
    });

    if (!session) {
      throw new NotFoundException('Sesión no encontrada');
    }

    return session;
  }

  private extractChatData(messages: Array<{ contenido: string; paso: number | null }>) {
    const data: {
      tipoServicio?: string;
      urgencia?: string;
      descripcion?: string;
      codigoPostal?: string;
      nombre?: string;
      email?: string;
      telefono?: string;
    } = {};

    const serviceMap: Record<string, string> = {
      '1': 'REFORMA_INTEGRAL',
      '2': 'REFORMA_BANO',
      '3': 'REFORMA_COCINA',
      '4': 'ELECTRICIDAD',
      '5': 'FONTANERIA',
      '6': 'CLIMATIZACION',
      '7': 'ARQUITECTO',
      '8': 'PEQUENAS_OBRAS',
      '9': 'NO_SE',
    };

    const urgencyMap: Record<string, string> = {
      '1': 'URGENTE',
      '2': 'ALTA',
      '3': 'MEDIA',
      '4': 'BAJA',
    };

    for (const msg of messages) {
      switch (msg.paso) {
        case 1:
          data.tipoServicio = serviceMap[msg.contenido.trim()] || 'NO_SE';
          break;
        case 2:
          data.urgencia = urgencyMap[msg.contenido.trim()] || 'MEDIA';
          break;
        case 3:
          data.descripcion = msg.contenido;
          break;
        case 4:
          data.codigoPostal = msg.contenido.trim();
          break;
        case 5: {
          // Try to extract name, email, telefono from the message
          const emailMatch = msg.contenido.match(
            /[\w.-]+@[\w.-]+\.\w+/,
          );
          const phoneMatch = msg.contenido.match(
            /[\d\s+()-]{9,}/,
          );
          if (emailMatch) data.email = emailMatch[0];
          if (phoneMatch) data.telefono = phoneMatch[0].trim();
          // Whatever remains is roughly the name
          let name = msg.contenido;
          if (emailMatch) name = name.replace(emailMatch[0], '');
          if (phoneMatch) name = name.replace(phoneMatch[0], '');
          name = name.replace(/[,;]/g, '').trim();
          if (name) data.nombre = name;
          break;
        }
      }
    }

    return data;
  }
}
