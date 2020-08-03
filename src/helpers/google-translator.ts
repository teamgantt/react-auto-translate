import Translator from './translator';

export default class GoogleTranslator extends Translator {
  async translate(value: string): Promise<string | undefined> {
    const translation = await this.tryGetGoogleTranslation(value);

    return translation;
  }

  async tryGetGoogleTranslation(value: string): Promise<string | undefined> {
    try {
      return await this.fetchGoogleTranslation(value);
    } catch (e) {
      return undefined;
    }
  }

  async fetchGoogleTranslation(value: string): Promise<string> {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?source=${this.from}&target=${this.to}&key=${this.apiKey}&q=${value}&format=text`
    );
    const {data} = await response.json();

    return data.translations[0].translatedText;
  }
}
