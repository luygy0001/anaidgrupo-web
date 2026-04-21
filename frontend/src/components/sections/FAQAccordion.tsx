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
  title = 'Preguntas frecuentes',
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
    <section className="section-padding">
      <div className="container-narrow">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          {title}
        </h2>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-foreground hover:bg-muted/50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-muted-foreground transition-transform duration-200',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-200',
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                )}
              >
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {withSchema && <JsonLd data={schemaData} />}
      </div>
    </section>
  );
}
