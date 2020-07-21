import {CacheProvider} from '../../types';

class MockCacheProvider implements CacheProvider {
  cache: Record<string, Record<string, string>>;

  constructor() {
    this.cache = {
      fr: {
        'My menu': 'Mon menu',
      },
    };
  }

  get(language: string, key: string): Promise<string | undefined> {
    return new Promise((resolve): void => {
      resolve(this.cache[language][key]);
    });
  }

  set(language: string, key: string, translation: string): void {
    this.cache[language] = {[key]: translation};
  }
}

export default MockCacheProvider;
