import React, { useState, useEffect } from "react";

type Props = {
  handleTranslate: (
    value: string,
    setTranslation: (translation: string) => void
  ) => void,
  language: string,
  value: string
};

export default function Translate({ handleTranslate, language, value }: Props) {
  const [translation, setTranslation] = useState(value);

  useEffect(() => {
    handleTranslate(value, setTranslation);
  }, [value, language]);

  return translation;
}
