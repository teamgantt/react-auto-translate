import React, {useContext, useState} from 'react';
import {TranslateContext, LanguageContext} from './translator-provider';

export function Translate({children: value}: {children: string}): string {
  const language = useContext(LanguageContext);
  const handleTranslate = useContext(TranslateContext);
  const [translation, setTranslation] = useState(value);

  React.useEffect(() => {
    handleTranslate(value, setTranslation);
  }, [value, language]);

  return translation;
}
