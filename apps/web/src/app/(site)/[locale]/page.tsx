import { notFound } from "next/navigation";
import { CorporateFooter } from "@/components/site/corporate-footer";
import { CorporateHeader } from "@/components/site/corporate-header";
import { CorporateHero } from "@/components/site/corporate-hero";
import type { ContactFormLabels } from "@/features/contact/contact-form";
import { ContactSection } from "@/features/contact/contact-section";
import { HomeIntroduction } from "@/features/home/home-introduction";
import { OurApproach } from "@/features/home/our-approach";
import { TechnologyMarkets } from "@/features/home/technology-markets";
import { WhatWeDo } from "@/features/home/what-we-do";
import { isLocale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/server";

type LocalePageProps = { params: Promise<{ locale: string }> };
type Service = { copy: string; number: string; title: string };
type ContactPath = { copy: string; id: string; label: string; title: string };

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [common, hero, introduction, whatWeDo, technology, approach, contact, footer] = await Promise.all([
    getTranslation(locale, "common"), getTranslation(locale, "hero"), getTranslation(locale, "introduction"),
    getTranslation(locale, "whatWeDo"), getTranslation(locale, "technology"), getTranslation(locale, "approach"),
    getTranslation(locale, "contact"), getTranslation(locale, "footer"),
  ]);

  return (
    <>
      <CorporateHeader currentLocale={locale} labels={{
        about: common("header.navigation.about"), contact: common("header.navigation.contact"),
        english: common("languageSwitcher.english"), language: common("languageSwitcher.label"),
        logoAlt: common("header.logoAlt"), menuClose: common("header.menu.close"), menuOpen: common("header.menu.open"),
        navigation: common("header.navigation.label"), spanish: common("languageSwitcher.spanish"),
        technology: common("header.navigation.technology"), whatWeDo: common("header.navigation.whatWeDo"),
      }} />
      <main id="main-content">
        <CorporateHero currentLocale={locale} labels={{
          eyebrow: hero("eyebrow"), headline: hero("headline"), mediaAlt: hero("mediaAlt"),
          primaryCta: hero("primaryCta"), secondaryCta: hero("secondaryCta"),
        }} />
        <HomeIntroduction copy={introduction("copy")} label={introduction("label")} />
        <WhatWeDo description={whatWeDo("description")} eyebrow={whatWeDo("eyebrow")} items={whatWeDo("items", { returnObjects: true }) as unknown as Service[]} title={whatWeDo("title")} />
        <TechnologyMarkets areas={technology("areas", { returnObjects: true }) as unknown as Array<Omit<Service, "number">>} description={technology("description")} eyebrow={technology("eyebrow")} title={technology("title")} />
        <OurApproach description={approach("description")} eyebrow={approach("eyebrow")} steps={approach("steps", { returnObjects: true }) as unknown as Service[]} title={approach("title")} />
        <ContactSection
          description={contact("description")}
          eyebrow={contact("eyebrow")}
          form={contact("form", { returnObjects: true }) as unknown as ContactFormLabels}
          paths={contact("paths", { returnObjects: true }) as unknown as ContactPath[]}
          title={contact("title")}
        />
      </main>
      <CorporateFooter currentLocale={locale} labels={{
        about: footer("about"), contact: footer("contact"), cookies: footer("cookies"), copyright: footer("copyright"),
        legalTitle: footer("legalTitle"), location: footer("location"), logoAlt: footer("logoAlt"), navigationTitle: footer("navigationTitle"),
        privacy: footer("privacy"), tagline: footer("tagline"), technology: footer("technology"), terms: footer("terms"), whatWeDo: footer("whatWeDo"),
      }} />
    </>
  );
}
