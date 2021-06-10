# React Auto Translate
> A simple React component to automatically translate strings with Google Translate API.

## Installation
```
npm install -S react-auto-translate

yarn add react-auto-translate
```

## Usage
React Auto Translate uses React Context API to pass the translation handler around. Wrap your top component with the `<Translator/>` component.

```jsx
// App.js
import {Translator, Translate} from 'react-auto-translate';

return (
  <Translator
      cacheProvider={cacheProvider}
      from='en'
      to='es'
      googleApiKey='API_KEY'
    >

    <h1><Translate>Welcome!</Translate></h1>
  ...
  </Translator>
);
```

## API
### `<Translator/>` ###
  - `cacheProvider`: optional handler to cache the translated strings.
  - `to`: Language to translate to. [See full list here](https://cloud.google.com/translate/docs/languages).
  - `from`: Language text is provided in. Defaults to `en`.
  - `googleApiKey`: required [Google Cloud Api Key](https://cloud.google.com/docs/authentication/api-keys) to use for translating.

### `CacheProvider`
 - Fully customizable handler to store the translated text. You can also use this to override and initialize the translations for your app.
 - If not provided, it will ping Google for the translation every time the component is rendered.
 - Must be an object that conforms to the following type.
 ```ts
type CacheProvider = {
  get: (language: string, key: string) => string | undefined;
  set: (language: string, key: string, translation: string) => void;
};

// example provider
const cacheProvider = {
  get: (language, key) =>
    ((JSON.parse(localStorage.getItem('translations')) || {})[key] || {})[
      language
    ],
  set: (language, key, value) => {
    const existing = JSON.parse(localStorage.getItem('translations')) || {
      [key]: {},
    };
    existing[key] = {...existing[key], [language]: value};
    localStorage.setItem('translations', JSON.stringify(existing));
  },
};
```

### `<Translate/>`
- Simple component to wrap plain text strings.

## TODO
- [ ] Tests
- [ ] CI Tests/Linting
- [ ] Contribution / development instructions
