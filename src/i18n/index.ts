import pt from './locales/pt/translation.json';
import en from './locales/en/translation.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const STORAGE_KEY = "lang";

function getInitialLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "pt" || saved === "en") return saved;

  const browser = navigator.language.toLowerCase();
  return browser.startsWith("pt") ? "pt" : "en";
}

i18next.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false, // React já protege contra XSS em texto
  },
});

i18next.on("languageChanged", (lng) => {
  localStorage.setItem(STORAGE_KEY, lng);
});

export default i18next;