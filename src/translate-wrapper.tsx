import React from "react";
import Translate from "./translate";
import { TranslateContext, LanguageContext } from "./translator";

type Props = {
  children: string
};

export default function TranslateWrapper({ children }: Props) {
  return (
    <TranslateContext.Consumer>
      {handleTranslate => (
        <LanguageContext.Consumer>
          {language => (
            <Translate
              handleTranslate={handleTranslate}
              language={language}
              value={children}
            />
          )}
        </LanguageContext.Consumer>
      )}
    </TranslateContext.Consumer>
  );
}
