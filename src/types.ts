export type TranslationHandler = {
  (value: string, setTranslation: (translation: string) => void): void;
};

export type TranslationSetter = (translation?: string) => void;

export interface CacheProvider {
  get: (language: string, key: string) => Promise<string | undefined>;
  set: (language: string, key: string, translation: string) => void;
}

export type TranslationOptions = {
  to: string;
  from: string;
  apiKey: string;
};
