import Image from "next/image";
import Link from "next/link";
import { ContactDetails } from "@/components/company/contact-details";
import { SocialLinks } from "@/components/company/social-links";
import { publicCompany, type SocialPlatform } from "@/config/public-company";
import { Container } from "@/components/design-system/container";
import type { Locale } from "@/lib/i18n/config";

type CorporateFooterProps = {
  currentLocale: Locale;
  labels: {
    about: string;
    contact: string;
    contactDetails: { address: string; email: string; phone: string; whatsapp: string };
    cookies: string;
    copyright: string;
    legalTitle: string;
    logoAlt: string;
    navigationTitle: string;
    privacy: string;
    social: Record<SocialPlatform, string>;
    socialTitle: string;
    tagline: string;
    technology: string;
    terms: string;
    whatWeDo: string;
  };
};

export function CorporateFooter({ currentLocale, labels }: CorporateFooterProps) {
  const sectionLinks = [
    ["what-we-do", labels.whatWeDo],
    ["technology", labels.technology],
    ["about", labels.about],
    ["contact", labels.contact],
  ];

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href={`/${currentLocale}`}>
              <Image alt={labels.logoAlt} height={713} src="/LogoColor.png" width={2206} />
            </Link>
            <p>{publicCompany.name}</p>
            <p>{publicCompany.location}</p>
            <p>{labels.tagline}</p>
            <ContactDetails className="contact-details--footer" labels={labels.contactDetails} />
            <SocialLinks label={labels.socialTitle} labels={labels.social} links={publicCompany.social} />
          </div>
          <nav aria-label={labels.navigationTitle}>
            <p className="site-footer__heading">{labels.navigationTitle}</p>
            <ul>
              {sectionLinks.map(([id, label]) => (
                <li key={id}><Link href={`/${currentLocale}#${id}`}>{label}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label={labels.legalTitle}>
            <p className="site-footer__heading">{labels.legalTitle}</p>
            <ul>
              <li><Link href={`/${currentLocale}/privacy`}>{labels.privacy}</Link></li>
              <li><Link href={`/${currentLocale}/terms`}>{labels.terms}</Link></li>
              <li><Link href={`/${currentLocale}/cookies`}>{labels.cookies}</Link></li>
            </ul>
          </nav>
        </div>
        <p className="site-footer__base">{labels.copyright}</p>
      </Container>
    </footer>
  );
}
