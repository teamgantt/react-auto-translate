import {TranslationOptions, CacheProvider} from '../types';

export default class Translator {
  to: string;
  from: string;
  apiKey: string;
  cacheProvider?: CacheProvider;

  constructor(options: TranslationOptions, cacheProvider?: CacheProvider) {
    this.from = options.from;
    this.to = options.to;
    this.apiKey = options.apiKey;
    this.cacheProvider = cacheProvider;
  }

  translate(value: string): Promise<string | undefined> {
    throw new Error('You must extend the base `translate()` method!');
  }
}
