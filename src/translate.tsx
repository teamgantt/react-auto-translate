import * as React from 'react';
import {TranslateContext, LanguageContext} from './translator';

export default function Translate({
  children: value,
}: {
  children: string;
}): JSX.Element {
  const language = React.useContext(LanguageContext);
  const handleTranslate = React.useContext(TranslateContext);
  const [translation, setTranslation] = React.useState(value);

  React.useEffect(() => {
    handleTranslate(value, setTranslation);
  }, [value, language]);

  return <React.Fragment>{translation}</React.Fragment>;
}
