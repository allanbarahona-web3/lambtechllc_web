import { notFound } from "next/navigation";
import { CorporateHeader } from "@/components/site/corporate-header";
import { CorporateHero } from "@/components/site/corporate-hero";
import { isLocale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalePreviewPage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = await getTranslation(locale);

  return (
    <>
      <CorporateHeader
        currentLocale={locale}
        labels={{
          about: t("header.navigation.about"),
          contact: t("header.navigation.contact"),
          english: t("languageSwitcher.english"),
          language: t("languageSwitcher.label"),
          logoAlt: t("header.logoAlt"),
          menuClose: t("header.menu.close"),
          menuOpen: t("header.menu.open"),
          navigation: t("header.navigation.label"),
          spanish: t("languageSwitcher.spanish"),
          technology: t("header.navigation.technology"),
          whatWeDo: t("header.navigation.whatWeDo"),
        }}
      />
      <main id="main-content">
        <CorporateHero
          labels={{
            eyebrow: t("hero.eyebrow"),
            headline: t("hero.headline"),
            mediaDescription: t("hero.media.description"),
            mediaLabel: t("hero.media.label"),
            mediaTitle: t("hero.media.title"),
            primaryCta: t("hero.primaryCta"),
            secondaryCta: t("hero.secondaryCta"),
            supportingCopy: t("hero.supportingCopy"),
          }}
        />
      </main>
    </>
  );
}
