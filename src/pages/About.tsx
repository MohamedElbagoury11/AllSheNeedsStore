import React from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/common/SEO';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <SEO 
        title={`${t('about.title')} | ALL SHE NEEDS`} 
        description={t('about.subtitle')}
      />
      
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{t('about.title')}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600 uppercase tracking-wide">Our Journey</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Elevating the Everyday
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('about.story_p1')}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t('about.story_p2')}
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('about.mission')}</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {t('about.mission_text')}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{t('about.quality')}</h3>
                <p className="mt-2 text-sm text-gray-600">{t('about.quality_text')}</p>
              </div>
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{t('about.curation')}</h3>
                <p className="mt-2 text-sm text-gray-600">{t('about.curation_text')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
