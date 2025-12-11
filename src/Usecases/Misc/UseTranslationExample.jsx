import { translator, useTranslator } from "../../service/translator.js";

export const UseTranslationExample = () => {
  const translations = {
    en: {
      common: {
        button: "Button",
      },
      header: {
        title: "Title",
      },
    },
    fr: {
      common: {},
      header: {},
    },
  };

  translator.init(translations, true);

  const { t } = useTranslator(["common", "header"]);

  console.log(t("title"));

  return <>Translations </>;
};
