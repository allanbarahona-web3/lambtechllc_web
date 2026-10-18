import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/design-system/button-link";
import { Container } from "@/components/design-system/container";
import { SectionHeading } from "@/components/design-system/section-heading";
import { CorporateHeader } from "@/components/site/corporate-header";
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
      <main className="design-preview" id="main-content">
        <section className="design-preview__intro" aria-labelledby="preview-title">
          <Container>
            <SectionHeading
              eyebrow={t("intro.eyebrow")}
              level="h1"
              titleId="preview-title"
              title={t("intro.title")}
              description={t("intro.description")}
            />
            <div className="design-preview__actions">
              <ButtonLink href="#type-scale">{t("intro.primaryAction")}</ButtonLink>
              <ButtonLink href="#foundation-tokens" variant="secondary">
                {t("intro.secondaryAction")}
              </ButtonLink>
            </div>
          </Container>
        </section>

        <section className="design-preview__section" id="type-scale">
          <Container>
            <SectionHeading
              eyebrow={t("typography.eyebrow")}
              title={t("typography.title")}
              description={t("typography.description")}
            />
            <div className="type-specimen" aria-label={t("typography.specimenLabel")}>
              <h3>{t("typography.h3")}</h3>
              <h4>{t("typography.h4")}</h4>
              <p>{t("typography.body")}</p>
              <p className="label">{t("typography.label")}</p>
            </div>
          </Container>
        </section>

        <section
          className="design-preview__section design-preview__section--subtle"
          id="foundation-tokens"
        >
          <Container>
            <SectionHeading
              eyebrow={t("tokens.eyebrow")}
              title={t("tokens.title")}
              description={t("tokens.description")}
            />
            <dl className="token-list">
              <div className="token-list__item">
                <dt>
                  <span className="token-list__swatch token-list__swatch--teal" />
                  {t("tokens.brandEmphasis")}
                </dt>
                <dd>#007E80</dd>
              </div>
              <div className="token-list__item">
                <dt>
                  <span className="token-list__swatch token-list__swatch--charcoal" />
                  {t("tokens.primaryText")}
                </dt>
                <dd>#333842</dd>
              </div>
              <div className="token-list__item">
                <dt>
                  <span className="token-list__swatch token-list__swatch--surface" />
                  {t("tokens.subtleSurface")}
                </dt>
                <dd>#F5F7F7</dd>
              </div>
            </dl>
          </Container>
        </section>
      </main>
    </>
  );
}
