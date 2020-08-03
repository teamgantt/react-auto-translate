import GoogleTranslator from './google-translator';
import {CacheProvider} from '../types';

export default class CacheTranslator extends GoogleTranslator {
  cacheProvider!: CacheProvider;

  async translate(value: string): Promise<string | undefined> {
    let translation = await this.cacheProvider.get(this.to, value);

    if (!translation) {
      translation = await this.tryGetGoogleTranslationAndCache(value);
    }

    return translation;
  }

  async tryGetGoogleTranslationAndCache(
    value: string
  ): Promise<string | undefined> {
    const translation = await this.tryGetGoogleTranslation(value);

    this.setCachedTranslationForValue(value, translation);
    return translation;
  }

  setCachedTranslationForValue(value: string, translation?: string): void {
    if (translation) {
      this.cacheProvider.set(this.to, value, translation);
    }
  }
}
