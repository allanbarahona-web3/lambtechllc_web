import { Container } from "@/components/design-system/container";
import { heroMedia } from "@/lib/media";

type CorporateHeroProps = {
  labels: {
    eyebrow: string;
    headline: string;
    mediaAlt: string;
    primaryCta: string;
    secondaryCta: string;
    supportingCopy: string;
  };
};

export function CorporateHero({ labels }: CorporateHeroProps) {
  return (
    <section aria-labelledby="hero-title" className="corporate-hero">
      <div className="corporate-hero__media">
        {/* The approved SVG is intentionally rendered without Next's SVG optimizer. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={labels.mediaAlt}
          className="corporate-hero__media-image"
          decoding="async"
          fetchPriority="high"
          height={heroMedia.height}
          src={heroMedia.src}
          width={heroMedia.width}
        />
        <div aria-hidden="true" className="corporate-hero__overlay" />
        <Container className="corporate-hero__content">
          <div className="corporate-hero__copy">
            <p className="eyebrow">{labels.eyebrow}</p>
            <h1 id="hero-title">{labels.headline}</h1>
            <div className="corporate-hero__actions">
              <button className="button-link button-link--primary" disabled type="button">
                {labels.primaryCta}
              </button>
              <button className="button-link button-link--secondary" disabled type="button">
                {labels.secondaryCta}
              </button>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <p className="corporate-hero__supporting-copy">{labels.supportingCopy}</p>
      </Container>
    </section>
  );
}
