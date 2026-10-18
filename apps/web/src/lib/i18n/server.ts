import i18next from "i18next";
import enPreview from "@/locales/en/preview.json";
import esPreview from "@/locales/es/preview.json";
import type { Locale } from "./config";

const resources = {
  en: { preview: enPreview },
  es: { preview: esPreview },
} as const;

export type TranslationNamespace = keyof (typeof resources)["en"];

export async function getTranslation(
  locale: Locale,
  namespace: TranslationNamespace = "preview",
) {
  const instance = i18next.createInstance();

  await instance.init({
    defaultNS: namespace,
    fallbackLng: false,
    interpolation: {
      escapeValue: false,
    },
    lng: locale,
    ns: [namespace],
    resources,
    returnNull: false,
  });

  return instance.getFixedT(locale, namespace);
}
