import dayjs from 'dayjs';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

dayjs.extend(localizedFormat);

const resources = {
  en: require('./en.json'),
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
