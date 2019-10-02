import * as React from 'react';

export type TranslationHandler = {
  (value: string, setTranslation: (translation: string) => void): Promise<void>;
};

const defaultHandler: TranslationHandler = () => new Promise(() => {});

export const TranslateContext: React.Context<
  TranslationHandler
> = React.createContext(defaultHandler);
export const LanguageContext: React.Context<string> = React.createContext('en');

type CacheProvider = {
  get: (language: string, key: string) => string | undefined;
  set: (language: string, key: string, translation: string) => void;
};

type Props = {
  to: string;
  from: string;
  cacheProvider?: CacheProvider;
  children: string;
  googleApiKey: string;
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
    let useCache = !!cacheProvider;
    let translatedText = value;

    if (to !== from && cacheProvider) {
      const cachedTranslation = cacheProvider.get(to, value);

      if (cachedTranslation) {
        translatedText = cachedTranslation;
      } else {
        useCache = false;
      }
    }

    if (!useCache) {
      try {
        const response = await fetch(
          `https://translation.googleapis.com/language/translate/v2?source=${from}&target=${to}&key=${googleApiKey}&q=${value}&format=text`
        );

        const jsonResponse = await response.json();
        translatedText = jsonResponse.data.translations[0].translatedText;

        if (cacheProvider) {
          cacheProvider.set(to, value, translatedText);
        }
      } catch {
        // noop
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
