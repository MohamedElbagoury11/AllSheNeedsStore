import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <SEO 
        title={`${t('contact.title')} | ALL SHE NEEDS`} 
        description={t('contact.subtitle')}
      />
      
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">{t('contact.title')}</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {t('contact.subtitle')}
            </p>
            
            <dl className="mt-10 space-y-6 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <MapPin className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  <strong>{t('contact.address_title')}</strong>
                  <br />
                  {t('contact.address_text')}
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <Phone className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  <strong>{t('contact.phone_title')}</strong>
                  <br />
                  <a className="hover:text-gray-900" href="tel:+201091712619">+201091712619</a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Mail className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  <strong>{t('contact.email_title')}</strong>
                  <br />
                  <a className="hover:text-gray-900" href="mailto:support@allsheneeds.com">support@allsheneeds.com</a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Contact Form */}
          <form className="rounded-2xl bg-gray-50 p-8 shadow-sm ring-1 ring-gray-200">
            <div className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="full-name" className="block text-sm font-semibold leading-6 text-gray-900">
                  {t('contact.name')}
                </label>
                <div className="mt-2.5">
                  <Input
                    type="text"
                    name="full-name"
                    id="full-name"
                    autoComplete="name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  {t('contact.email')}
                </label>
                <div className="mt-2.5">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-gray-900">
                  {t('contact.subject')}
                </label>
                <div className="mt-2.5">
                  <Input
                    type="text"
                    name="subject"
                    id="subject"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                  {t('contact.message')}
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button type="submit" variant="default" className="w-full">
                {t('contact.submit')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
