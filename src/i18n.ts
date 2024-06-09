import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enNs1 from './locales/en/ns1.json'
import thNs1 from './locales/th/ns1.json'

export const defaultNS = 'ns1';

i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  defaultNS,
  resources: {
    en: {
      ns1: enNs1,
    },
    th: {
      ns1: thNs1,
    },
  },
});

export default i18next;