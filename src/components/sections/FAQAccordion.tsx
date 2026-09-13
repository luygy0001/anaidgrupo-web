'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FAQItem } from '@/types';
import JsonLd from '@/components/seo/JsonLd';

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  withSchema?: boolean;
}

export default function FAQAccordion({
  items,
  title = 'Preguntas frecuentes sobre reformas en Madrid',
  withSchema = true,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            Dudas resueltas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Resolvemos con total transparencia las dudas más habituales sobre plazos, presupuestos cerrados y seguimiento de obra.
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  'bg-white border rounded-2xl transition-all duration-200 shadow-xs overflow-hidden',
                  isOpen ? 'border-amber-400 shadow-md ring-1 ring-amber-400/20' : 'border-slate-200 hover:border-slate-300'
                )}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-slate-900 hover:text-amber-600 transition-colors gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg text-slate-900 leading-snug">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-amber-500 shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180 text-amber-600'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-200 ease-in-out',
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {withSchema && <JsonLd data={schemaData} />}
      </div>
    </section>
  );
}
