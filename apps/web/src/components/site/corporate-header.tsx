import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/design-system/container";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import type { Locale } from "@/lib/i18n/config";
import {
  getPlannedSectionHref,
  type PlannedSectionId,
} from "@/lib/site-navigation";
import { MobileNavigation } from "./mobile-navigation";

type CorporateHeaderProps = {
  currentLocale: Locale;
  labels: {
    about: string;
    contact: string;
    english: string;
    language: string;
    logoAlt: string;
    menuClose: string;
    menuOpen: string;
    navigation: string;
    spanish: string;
    technology: string;
    whatWeDo: string;
  };
};

const navigationOrder: PlannedSectionId[] = [
  "what-we-do",
  "technology",
  "about",
  "contact",
];

export function CorporateHeader({ currentLocale, labels }: CorporateHeaderProps) {
  const navigationItems = navigationOrder.map((id) => ({
    href: getPlannedSectionHref(currentLocale, id),
    id,
    label:
      id === "what-we-do"
        ? labels.whatWeDo
        : id === "technology"
          ? labels.technology
          : id === "about"
            ? labels.about
            : labels.contact,
  }));

  return (
    <header className="site-header">
      <Container className="site-header__container">
        <div className="site-header__desktop">
          <Link className="site-header__logo" href={`/${currentLocale}`}>
            <Image
              alt={labels.logoAlt}
              height={713}
              priority
              sizes="(max-width: 63.99rem) 140px, 164px"
              src="/LogoColor.png"
              width={2206}
            />
          </Link>

          <nav aria-label={labels.navigation} className="site-header__primary-navigation">
            <ul>
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <span
                    aria-disabled="true"
                    className="site-header__deferred-link"
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__utilities">
            <LocaleSwitcher
              currentLocale={currentLocale}
              englishAccessibleLabel={labels.english}
              englishLabel="EN"
              label={labels.language}
              spanishAccessibleLabel={labels.spanish}
              spanishLabel="ES"
            />
            <span aria-disabled="true" className="site-header__contact-cta">
              {labels.contact}
            </span>
          </div>
        </div>

        <div className="site-header__mobile-bar">
          <Link className="site-header__logo" href={`/${currentLocale}`}>
            <Image
              alt={labels.logoAlt}
              height={713}
              priority
              sizes="140px"
              src="/LogoColor.png"
              width={2206}
            />
          </Link>
          <MobileNavigation
            closeLabel={labels.menuClose}
            currentLocale={currentLocale}
            englishLabel={labels.english}
            items={navigationItems}
            languageLabel={labels.language}
            navigationLabel={labels.navigation}
            openLabel={labels.menuOpen}
            spanishLabel={labels.spanish}
          />
        </div>
      </Container>
    </header>
  );
}
