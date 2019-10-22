import React, {createContext} from 'react';

export type TranslationHandler = {
  (value: string, setTranslation: (translation: string) => void): void;
};

const defaultHandler: TranslationHandler = () => {};

export const TranslateContext: React.Context<
  TranslationHandler
> = createContext(defaultHandler);
export const LanguageContext: React.Context<string> = createContext('en');

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
  const getCachedTranslation = (value: string): string | undefined => {
    if (!cacheProvider) {
      return undefined;
    }

    return cacheProvider.get(to, value);
  };

  const setCachedTranslation = (value: string, translation: string): void => {
    if (!cacheProvider) {
      return;
    }

    cacheProvider.set(to, value, translation);
  };

  const getGoogleTranslation = async (
    value: string
  ): Promise<string | undefined> => {
    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?source=${from}&target=${to}&key=${googleApiKey}&q=${value}&format=text`
      );

      const jsonResponse = await response.json();

      return jsonResponse.data.translations[0].translatedText;
    } catch (e) {
      return undefined;
    }
  };

  const handleTranslationAsync: TranslationHandler = async (
    value,
    setTranslation
  ) => {
    // no need to translate!
    if (to === from) {
      setTranslation(value);
      return;
    }

    // attempt cached translation first
    const cachedTranslation = getCachedTranslation(value);
    if (cachedTranslation) {
      setTranslation(cachedTranslation);
      return;
    }

    // attempt google translation next
    const translatedText = await getGoogleTranslation(value);
    if (translatedText) {
      setCachedTranslation(value, translatedText);
      setTranslation(translatedText);
      return;
    }

    // default to value
    setTranslation(value);
  };

  return (
    <TranslateContext.Provider value={handleTranslationAsync}>
      <LanguageContext.Provider value={to}>{children}</LanguageContext.Provider>
    </TranslateContext.Provider>
  );
}
