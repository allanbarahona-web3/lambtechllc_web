import { publicCompany } from "@/config/public-company";
import { PublicMediaFrame } from "@/components/design-system/public-media-frame";
import { Container } from "@/components/design-system/container";
import { SectionHeading } from "@/components/design-system/section-heading";

type PartnerNetworkProps = {
  approvalNote: string;
  description: string;
  eyebrow: string;
  logoFallback: string;
  slotLabel: string;
  title: string;
};

export function PartnerNetwork({ approvalNote, description, eyebrow, logoFallback, slotLabel, title }: PartnerNetworkProps) {
  const logos = publicCompany.partnerLogos;

  return (
    <section aria-labelledby="partner-network-title" className="content-section partner-network" id="partners">
      <Container>
        <SectionHeading description={description} eyebrow={eyebrow} title={title} titleId="partner-network-title" />
        <div className="partner-network__strip" role={logos.length ? "list" : undefined}>
          {logos.length ? logos.map((logo) => (
            <PublicMediaFrame
              alt={logo.name}
              aspectRatio="3 / 2"
              className="partner-network__logo"
              fallbackLabel={logoFallback}
              key={logo.src}
              src={logo.src}
            />
          )) : Array.from({ length: 4 }, (_, index) => (
            <div aria-hidden="true" className="partner-network__slot" key={index}>{slotLabel}</div>
          ))}
        </div>
        <p className="partner-network__note">{approvalNote}</p>
      </Container>
    </section>
  );
}
