import { ButtonLink } from "@/components/design-system/button-link";
import { Container } from "@/components/design-system/container";
import { SectionHeading } from "@/components/design-system/section-heading";

export default function Home() {
  return (
    <main className="design-preview">
      <section className="design-preview__intro" aria-labelledby="preview-title">
        <Container>
          <SectionHeading
            eyebrow="LAMBTECH LLC"
            level="h1"
            titleId="preview-title"
            title="Design system preview"
            description="A neutral environment for reviewing typography, color, spacing, and responsive composition before website content is introduced."
          />
          <div className="design-preview__actions">
            <ButtonLink href="#type-scale">Primary action</ButtonLink>
            <ButtonLink href="#foundation-tokens" variant="secondary">
              Secondary action
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="design-preview__section" id="type-scale">
        <Container>
          <SectionHeading
            eyebrow="Typography"
            title="A measured editorial hierarchy."
            description="Fluid display sizes provide presence without compromising comfortable reading at smaller viewports."
          />
          <div className="type-specimen" aria-label="Typography scale preview">
            <h3>H3 / Structured emphasis</h3>
            <h4>H4 / Supporting detail</h4>
            <p>
              Body text is set for clarity, with an intentionally restrained measure and
              line height suitable for English and Spanish corporate content.
            </p>
            <p className="label">Label / Supporting metadata</p>
          </div>
        </Container>
      </section>

      <section
        className="design-preview__section design-preview__section--subtle"
        id="foundation-tokens"
      >
        <Container>
          <SectionHeading
            eyebrow="Foundation tokens"
            title="A focused visual vocabulary."
            description="Semantic tokens make the approved palette and layout decisions repeatable as the site grows."
          />
          <dl className="token-list">
            <div className="token-list__item">
              <dt>
                <span className="token-list__swatch token-list__swatch--teal" />
                Brand emphasis
              </dt>
              <dd>#007E80</dd>
            </div>
            <div className="token-list__item">
              <dt>
                <span className="token-list__swatch token-list__swatch--charcoal" />
                Primary text
              </dt>
              <dd>#333842</dd>
            </div>
            <div className="token-list__item">
              <dt>
                <span className="token-list__swatch token-list__swatch--surface" />
                Subtle surface
              </dt>
              <dd>#F5F7F7</dd>
            </div>
          </dl>
        </Container>
      </section>
    </main>
  );
}
