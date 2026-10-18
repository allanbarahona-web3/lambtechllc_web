import i18next from "i18next";
import enApproach from "@/locales/en/approach.json";
import enCommon from "@/locales/en/common.json";
import enContact from "@/locales/en/contact.json";
import enFooter from "@/locales/en/footer.json";
import enHero from "@/locales/en/hero.json";
import enIntroduction from "@/locales/en/introduction.json";
import enLegal from "@/locales/en/legal.json";
import enPartners from "@/locales/en/partners.json";
import enTechnology from "@/locales/en/technology.json";
import enWhatWeDo from "@/locales/en/what-we-do.json";
import esApproach from "@/locales/es/approach.json";
import esCommon from "@/locales/es/common.json";
import esContact from "@/locales/es/contact.json";
import esFooter from "@/locales/es/footer.json";
import esHero from "@/locales/es/hero.json";
import esIntroduction from "@/locales/es/introduction.json";
import esLegal from "@/locales/es/legal.json";
import esPartners from "@/locales/es/partners.json";
import esTechnology from "@/locales/es/technology.json";
import esWhatWeDo from "@/locales/es/what-we-do.json";
import type { Locale } from "./config";

const resources = {
  en: {
    approach: enApproach,
    common: enCommon,
    contact: enContact,
    footer: enFooter,
    hero: enHero,
    introduction: enIntroduction,
    legal: enLegal,
    partners: enPartners,
    technology: enTechnology,
    whatWeDo: enWhatWeDo,
  },
  es: {
    approach: esApproach,
    common: esCommon,
    contact: esContact,
    footer: esFooter,
    hero: esHero,
    introduction: esIntroduction,
    legal: esLegal,
    partners: esPartners,
    technology: esTechnology,
    whatWeDo: esWhatWeDo,
  },
} as const;

export type TranslationNamespace = keyof (typeof resources)["en"];

export async function getTranslation(
  locale: Locale,
  namespace: TranslationNamespace = "common",
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
