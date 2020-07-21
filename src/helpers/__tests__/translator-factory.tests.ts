import TranslatorFactory from '../translator-factory';
import MockCacheProvider from '../__mocks__/cache-provider';
import IdenticalTranslator from '../identical-translator';
import CacheTranslator from '../cache-translator';
import GoogleTranslator from '../google-translator';

describe('TranslatorFactory', () => {
  it('should return IdenticalTranslator when languages are the same', () => {
    const translator = TranslatorFactory.create({
      to: 'en',
      from: 'en',
      apiKey: 'blabla123',
    });

    expect(translator).toBeInstanceOf(IdenticalTranslator);
  });
  it('should return CacheTranslator when cacheProvider is included', () => {
    const translator = TranslatorFactory.create(
      {
        to: 'fr',
        from: 'en',
        apiKey: 'blabla123',
      },
      new MockCacheProvider()
    );

    expect(translator).toBeInstanceOf(CacheTranslator);
  });
  it('should return GoogleTranslator when cacheProvider is ommitted', () => {
    const translator = TranslatorFactory.create({
      to: 'fr',
      from: 'en',
      apiKey: 'blabla123',
    });

    expect(translator).toBeInstanceOf(GoogleTranslator);
  });
});
