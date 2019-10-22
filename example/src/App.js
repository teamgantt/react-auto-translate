import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Translator, Translate} from 'react-auto-translate';

// This is just an example of how you could wire this to localStorage
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

function App() {
  const [to, setTo] = useState('es');

  return (
    <Translator
      cacheProvider={cacheProvider}
      to={to}
      from="en"
      googleApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
    >
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <h3>React Auto Translate</h3>
            <Translate>Select a Language</Translate>:
            <br />
            <select value={to} onChange={({target: {value}}) => setTo(value)}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
              <option value="zh-TW">Chinese</option>
            </select>
            <h1>
              <Translate>Hello World!</Translate>🌎
            </h1>
          </p>
        </header>
      </div>
    </Translator>
  );
}

export default App;
