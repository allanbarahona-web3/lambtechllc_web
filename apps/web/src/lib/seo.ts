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
  pathSuffix = "",
): Metadata {
  const normalizedSuffix = pathSuffix.replace(/^\/+/, "");
  const pathname = normalizedSuffix ? `/${locale}/${normalizedSuffix}` : `/${locale}`;

  return {
    alternates: {
      canonical: pathname,
      languages: {
        en: normalizedSuffix ? `/en/${normalizedSuffix}` : "/en",
        es: normalizedSuffix ? `/es/${normalizedSuffix}` : "/es",
        "x-default": normalizedSuffix ? `/${defaultLocale}/${normalizedSuffix}` : `/${defaultLocale}`,
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
