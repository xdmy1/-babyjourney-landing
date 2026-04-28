'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Lang } from './translations';

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)['en'];
}

const LangContext = createContext<LangContextType>({
  lang: 'ro',
  setLang: () => {},
  t: translations['ro'],
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ro');
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
