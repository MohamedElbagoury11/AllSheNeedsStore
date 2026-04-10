import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/common/SEO';

const Terms = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <SEO 
        title={`${t('terms.title')} | ALL SHE NEEDS`} 
        description={t('terms.intro')}
      />
      
      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8 text-gray-700">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">{t('terms.title')}</h1>
        <p className="text-sm text-gray-500 mb-8">{t('terms.last_updated')}</p>
        
        <div className="prose prose-blue max-w-none">
          <p className="mb-8">{t('terms.intro')}</p>
          
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('terms.section1_title')}</h2>
            <p>{t('terms.section1_text')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('terms.section2_title')}</h2>
            <p>{t('terms.section2_text')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('terms.section3_title')}</h2>
            <p>{t('terms.section3_text')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{t('terms.section4_title')}</h2>
            <p>{t('terms.section4_text')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at support@allsheneeds.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
