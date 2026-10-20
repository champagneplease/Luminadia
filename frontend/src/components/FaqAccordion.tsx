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
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border border-[#2a322f] rounded-xl bg-[#161a19] overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-5 text-left text-[#f4f3ef] hover:text-amber-500 font-medium text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              id={`faq-question-${item.id}`}
            >
              <span className="pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-[#9aa19d] transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-amber-500' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div
                id={`faq-answer-${item.id}`}
                role="region"
                aria-labelledby={`faq-question-${item.id}`}
                className="px-5 pb-5 text-sm text-[#9aa19d] leading-relaxed border-t border-[#1c2220] pt-3"
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
