import { Container } from "@/components/design-system/container";

type CorporateHeroProps = {
  labels: {
    eyebrow: string;
    headline: string;
    mediaDescription: string;
    mediaLabel: string;
    mediaTitle: string;
    primaryCta: string;
    secondaryCta: string;
    supportingCopy: string;
  };
};

export function CorporateHero({ labels }: CorporateHeroProps) {
  return (
    <section aria-labelledby="hero-title" className="corporate-hero">
      <Container>
        <div className="corporate-hero__grid layout-grid">
          <div className="corporate-hero__copy">
            <p className="eyebrow">{labels.eyebrow}</p>
            <h1 id="hero-title">{labels.headline}</h1>
            <p className="corporate-hero__supporting-copy">{labels.supportingCopy}</p>
            <div className="corporate-hero__actions">
              <button className="button-link button-link--primary" disabled type="button">
                {labels.primaryCta}
              </button>
              <button className="button-link button-link--secondary" disabled type="button">
                {labels.secondaryCta}
              </button>
            </div>
          </div>

          <div className="corporate-hero__media">
            <div className="corporate-hero__media-placeholder">
              <p className="label">{labels.mediaLabel}</p>
              <p className="corporate-hero__media-title">{labels.mediaTitle}</p>
              <p className="corporate-hero__media-description">{labels.mediaDescription}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
