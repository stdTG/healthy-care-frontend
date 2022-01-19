import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './assets/i18n/en.json';
import fr from './assets/i18n/fr.json';
import es from './assets/i18n/es.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en.master },
      fr: { translation: fr.master },
      es: { translation: es.master },
    },
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
