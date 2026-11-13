'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={`faq-acc-${item.id || index}-${index}`}
            className="rounded-2xl bg-white overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-5 text-left text-[#1E242B] font-semibold text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E242B]"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              id={`faq-question-${item.id}`}
            >
              <span className="pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-[#1E242B] transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div
                id={`faq-answer-${item.id}`}
                role="region"
                aria-labelledby={`faq-question-${item.id}`}
                className="px-5 pb-5 text-sm text-[#4A545E] leading-relaxed pt-1"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
