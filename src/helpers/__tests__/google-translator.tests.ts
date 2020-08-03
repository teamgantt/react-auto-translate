import GoogleTranslator from '../google-translator';

describe('GoogleTranslator', () => {
  let translator: GoogleTranslator;

  beforeEach(() => {
    translator = new GoogleTranslator({
      to: 'fr',
      from: 'en',
      apiKey: 'fooBar123',
    });

    jest.spyOn(translator, 'fetchGoogleTranslation').mockImplementation(
      (value: string): Promise<string> => {
        return new Promise((resolve): void => {
          if (value === 'Error') {
            throw new Error();
          }

          resolve('Bonjour le monde!');
        });
      }
    );
  });

  it('should resolve the returned translation from Google', async () => {
    expect(await translator.translate('Hello world!')).toEqual(
      'Bonjour le monde!'
    );
  });

  it('should resolve undefined if it errors', async () => {
    expect(await translator.translate('Error')).toBeUndefined();
  });
});
