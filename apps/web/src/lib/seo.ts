import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "./i18n/config";

function getMetadataBase() {
  const siteUrl = process.env.SITE_URL;

  if (!siteUrl) {
    return undefined;
  }

  try {
    return new URL(siteUrl);
  } catch {
    return undefined;
  }
}

export function getLocaleMetadata(
  locale: Locale,
  title: string,
  description: string,
): Metadata {
  const pathname = `/${locale}`;

  return {
    alternates: {
      canonical: pathname,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": `/${defaultLocale}`,
      },
    },
    description,
    metadataBase: getMetadataBase(),
    title,
  };
}

export function getLocaleStaticParams() {
  return locales.map((locale) => ({ locale }));
}
