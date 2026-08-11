import { useState } from 'react';
import businessInfo from '../data/businessInfo';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section bg-navy-50/40">
      <div className="container-premium">
        <div className="text-center mb-14 lg:mb-20">
          <div className="section-label justify-center">FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle mx-auto">
            Everything you need to know about working with Ahmad Wattoo Real Estate
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {businessInfo.faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-navy-100 overflow-hidden transition-all duration-300 hover:border-navy-200"
            >
              <button
                className="w-full px-6 lg:px-8 py-5 lg:py-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 focus-visible:ring-inset"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-base lg:text-lg font-semibold text-navy-900">{faq.question}</span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center transition-all duration-300">
                  <svg
                    className={`w-4 h-4 text-navy-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 lg:px-8 pb-6 text-navy-500 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
