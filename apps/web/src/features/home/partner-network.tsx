import { ManufacturerLogoGrid } from "@/components/company/manufacturer-logo-grid";
import { publicCompany } from "@/config/public-company";
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
        <ManufacturerLogoGrid fallbackLabel={logoFallback} logos={logos} slotCount={4} slotLabel={slotLabel} variant="preview" />
        <p className="partner-network__note">{approvalNote}</p>
      </Container>
    </section>
  );
}
