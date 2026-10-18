import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CorporateFooter } from "@/components/site/corporate-footer";
import { CorporateHeader } from "@/components/site/corporate-header";
import { LegalPage } from "@/components/site/legal-page";
import { isLocale, locales } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";
import { getLocaleMetadata } from "@/lib/seo";

const legalPages = ["privacy", "terms", "cookies"] as const;
type LegalPageId = (typeof legalPages)[number];
type LegalRouteProps = { params: Promise<{ legal: string; locale: string }> };

function isLegalPage(value: string): value is LegalPageId {
  return legalPages.includes(value as LegalPageId);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => legalPages.map((legal) => ({ legal, locale })));
}

export async function generateMetadata({ params }: LegalRouteProps): Promise<Metadata> {
  const { legal, locale } = await params;
  if (!isLocale(locale) || !isLegalPage(legal)) return {};
  const t = await getTranslation(locale, "legal");
  return getLocaleMetadata(locale, t(`${legal}.title`), t(`${legal}.description`), legal);
}

export default async function LocalizedLegalPage({ params }: LegalRouteProps) {
  const { legal, locale } = await params;
  if (!isLocale(locale) || !isLegalPage(legal)) notFound();

  const [common, footer, legalT] = await Promise.all([
    getTranslation(locale, "common"), getTranslation(locale, "footer"), getTranslation(locale, "legal"),
  ]);

  return (
    <>
      <CorporateHeader currentLocale={locale} localePath={legal} labels={{
        about: common("header.navigation.about"), contact: common("header.navigation.contact"),
        english: common("languageSwitcher.english"), language: common("languageSwitcher.label"),
        logoAlt: common("header.logoAlt"), menuClose: common("header.menu.close"), menuOpen: common("header.menu.open"),
        navigation: common("header.navigation.label"), spanish: common("languageSwitcher.spanish"),
        technology: common("header.navigation.technology"), whatWeDo: common("header.navigation.whatWeDo"),
      }} />
      <LegalPage approvalGate={legalT("approvalGate")} eyebrow={legalT("eyebrow")} pendingCopy={legalT("pendingCopy")} pendingTitle={legalT("pendingTitle")} title={legalT(`${legal}.title`)} />
      <CorporateFooter currentLocale={locale} labels={{
        about: footer("about"), contact: footer("contact"), contactDetails: footer("contactDetails", { returnObjects: true }) as { address: string; email: string; fax: string; phone: string; whatsapp: string }, cookies: footer("cookies"), copyright: footer("copyright"),
        legalTitle: footer("legalTitle"), logoAlt: footer("logoAlt"), navigationTitle: footer("navigationTitle"),
        privacy: footer("privacy"), social: footer("social", { returnObjects: true }) as Record<"facebook" | "instagram" | "linkedin" | "whatsapp" | "youtube", string>, socialTitle: footer("socialTitle"), status: footer("status"), tagline: footer("tagline"), technology: footer("technology"), terms: footer("terms"), whatWeDo: footer("whatWeDo"),
      }} />
    </>
  );
}
