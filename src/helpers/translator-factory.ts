import Translator from './translator';
import IdenticalTranslator from './identical-translator';
import CacheTranslator from './cache-translator';
import GoogleTranslator from './google-translator';
import {TranslationOptions, CacheProvider} from '../types';

export default class TranslatorFactory {
  static create(
    options: TranslationOptions,
    cacheProvider?: CacheProvider
  ): Translator {
    if (this.isToLanguageIdenticalWithFrom(options.to, options.from)) {
      return new IdenticalTranslator(options);
    }

    if (this.isCachable(cacheProvider)) {
      return new CacheTranslator(options, cacheProvider);
    }

    return new GoogleTranslator(options);
  }

  static isToLanguageIdenticalWithFrom = (
    to: string,
    from: string
  ): boolean => {
    return to === from;
  };

  static isCachable = (cacheProvider?: CacheProvider): boolean => {
    return !!cacheProvider;
  };
}
