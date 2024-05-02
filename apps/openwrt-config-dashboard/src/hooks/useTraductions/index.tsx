import React, { useEffect, useState } from 'react';
import i18n, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation';
import translationFR from './locales/fr/translation';
import translationES from './locales/es/translation';
import translationIT from './locales/it/translation';
import translationDE from './locales/de/translation';

import { useDataState, useEmitter } from '../useLuciRCPjsonClient/stateMachine';

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  /*
  es: {
    translation: translationES,
  },
  it: {
    translation: translationIT,
  },
  de: {
    translation: translationDE,
  },
  */
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export const useTraductions = () => {
  const emit = useEmitter();
  const { language } = useDataState();
  const [stateLangue, setStateLangue] = useState(language);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
  ];

  const set = (lang: string) => {
    emit({ event: 'updateLanguage', data: lang });
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    set(i18n.language);

    const timeout = setTimeout(() => {
      const i18nLang = i18n.language.split('-')[0];
      if (languages.find((lang) => lang.code === i18nLang) && i18nLang !== stateLangue) {
        set(i18nLang);
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [i18n.language]);

  useEffect(() => {
    setStateLangue(language.split('-')[0]);
  }, [language]);

  return { i18nLangue: i18n.language.split('-')[0], language, set, languages };
};
