import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WhatsAppButton } from "@/components/company/whatsapp-button";
import { CorporateFooter } from "@/components/site/corporate-footer";
import { CorporateHeader } from "@/components/site/corporate-header";
import { CorporatePageFoundation } from "@/components/site/corporate-page-foundation";
import { LegalPage } from "@/components/site/legal-page";
import { publicCompany } from "@/config/public-company";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";
import {
  corporateRouteIds,
  isCorporateRoute,
  isLegalRoute,
  legalRouteIds,
  type CorporateRouteId,
} from "@/lib/site-navigation";
import { getLocaleMetadata } from "@/lib/seo";

type LocalizedPageProps = { params: Promise<{ locale: string; page: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...corporateRouteIds.map((page) => ({ locale, page })),
    ...legalRouteIds.map((page) => ({ locale, page })),
  ]);
}

function headerLabels(common: Awaited<ReturnType<typeof getTranslation>>) {
  return {
    about: common("header.navigation.about"),
    contact: common("header.navigation.contact"),
    english: common("languageSwitcher.english"),
    language: common("languageSwitcher.label"),
    logoAlt: common("header.logoAlt"),
    menuClose: common("header.menu.close"),
    menuOpen: common("header.menu.open"),
    navigation: common("header.navigation.label"),
    spanish: common("languageSwitcher.spanish"),
    technology: common("header.navigation.technology"),
    whatWeDo: common("header.navigation.whatWeDo"),
  };
}

function footerLabels(footer: Awaited<ReturnType<typeof getTranslation>>) {
  return {
    about: footer("about"),
    contact: footer("contact"),
    contactDetails: footer("contactDetails", { returnObjects: true }) as { address: string; email: string; fax: string; phone: string; whatsapp: string },
    cookies: footer("cookies"),
    copyright: footer("copyright"),
    footerLogoMissing: footer("footerLogoMissing"),
    legalTitle: footer("legalTitle"),
    logoAlt: footer("logoAlt"),
    navigationTitle: footer("navigationTitle"),
    privacy: footer("privacy"),
    social: footer("social", { returnObjects: true }) as Record<"facebook" | "instagram" | "linkedin" | "tiktok", string>,
    socialTitle: footer("socialTitle"),
    tagline: footer("tagline"),
    technology: footer("technology"),
    terms: footer("terms"),
    whatWeDo: footer("whatWeDo"),
  };
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale, page } = await params;
  if (!isLocale(locale) || (!isCorporateRoute(page) && !isLegalRoute(page))) return {};

  if (isLegalRoute(page)) {
    const t = await getTranslation(locale, "legal");
    return getLocaleMetadata(locale, t(`${page}.title`), t(`${page}.description`), page, { noIndex: true });
  }

  const t = await getTranslation(locale, "pageFoundation");
  return getLocaleMetadata(locale, t(`pages.${page}.title`), t(`pages.${page}.description`), page, { noIndex: true });
}

function isRoute(locale: string, page: string): locale is Locale {
  return isLocale(locale) && (isCorporateRoute(page) || isLegalRoute(page));
}

export default async function LocalizedPage({ params }: LocalizedPageProps) {
  const { locale, page } = await params;
  if (!isRoute(locale, page)) notFound();

  const [common, footer, legal, pageFoundation] = await Promise.all([
    getTranslation(locale, "common"),
    getTranslation(locale, "footer"),
    getTranslation(locale, "legal"),
    getTranslation(locale, "pageFoundation"),
  ]);
  const currentPage: CorporateRouteId | undefined = isCorporateRoute(page) ? page : undefined;
  const whatsappLabel = footer("contactDetails.whatsapp");

  return (
    <>
      <CorporateHeader currentLocale={locale} currentPage={currentPage} localePath={page} labels={headerLabels(common)} />
      {isLegalRoute(page) ? (
        <LegalPage approvalGate={legal("approvalGate")} eyebrow={legal("eyebrow")} pendingCopy={legal("pendingCopy")} pendingTitle={legal("pendingTitle")} title={legal(`${page}.title`)} />
      ) : (
        <CorporatePageFoundation
          eyebrow={pageFoundation("eyebrow")}
          pendingCopy={pageFoundation("pendingCopy")}
          pendingTitle={pageFoundation("pendingTitle")}
          title={pageFoundation(`pages.${page}.title`)}
        />
      )}
      <CorporateFooter currentLocale={locale} labels={footerLabels(footer)} />
      <WhatsAppButton label={whatsappLabel} url={publicCompany.whatsappUrl} />
    </>
  );
}
