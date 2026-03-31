import { createContext, useContext } from 'react';

const LangContext = createContext({ lang: 'en', setLang: () => {} });

export default LangContext;

export function useLang() {
  return useContext(LangContext);
}
