import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/common/SEO';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between text-left text-gray-900"
      >
        <span className="text-base font-semibold leading-7">{question}</span>
        <span className="ml-6 flex-none">
          {isOpen ? (
            <ChevronUp className="h-6 w-6 text-gray-500" />
          ) : (
            <ChevronDown className="h-6 w-6 text-gray-500" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 pr-12">
          <p className="text-base leading-7 text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t('faq.payment_q'),
      answer: t('faq.payment_a'),
    },
    {
      question: t('faq.order_q'),
      answer: t('faq.order_a'),
    },
  ];

  return (
    <div className="bg-white">
      <SEO 
        title={`${t('faq.title')} | ALL SHE NEEDS`} 
        description={t('faq.subtitle')}
      />
      
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('faq.title')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {t('faq.subtitle')}
            </p>
          </div>
          <dl className="mt-10 space-y-2">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
