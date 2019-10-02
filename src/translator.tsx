import React, {createContext} from 'react';

export const TranslateContext: React.Context<
  TranslationHandler
> = createContext(null);
export const LanguageContext: React.Context<string> = createContext('en');

type CacheProvider = {
  get: (language: string, key: string) => string;
  set: (language: string, key: string, translation: string) => void;
};

type Props = {
  to: string;
  from: string;
  cacheProvider?: CacheProvider;
  children: string;
  googleApiKey: string;
};

export type TranslationHandler = {
  (value: string, setTranslation: (translation: string) => void): Promise<void>;
};

export default function Translator({
  to,
  from,
  cacheProvider,
  children,
  googleApiKey,
}: Props): JSX.Element {
  const handleTranslationAsync: TranslationHandler = async (
    value,
    setTranslation
  ) => {
    let translatedText = value;

    if (to !== from) {
      try {
        translatedText = cacheProvider.get(to, value);
      } catch (e) {
        translatedText = null;
      }

      if (!translatedText) {
        const response = await fetch(
          `https://translation.googleapis.com/language/translate/v2?source=${from}&target=${to}&key=${googleApiKey}&q=${value}&format=text`
        );

        const jsonResponse = await response.json();
        translatedText = jsonResponse.data.translations[0].translatedText;

        try {
          cacheProvider.set(to, value, translatedText);
        } catch (e) {
          // noop
        }
      }
    }

    setTranslation(translatedText);
  };

  return (
    <TranslateContext.Provider value={handleTranslationAsync}>
      <LanguageContext.Provider value={to}>{children}</LanguageContext.Provider>
    </TranslateContext.Provider>
  );
}
