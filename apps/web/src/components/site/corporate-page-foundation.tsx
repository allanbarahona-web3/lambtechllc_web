import { Container } from "@/components/design-system/container";
import { SectionHeading } from "@/components/design-system/section-heading";

type CorporatePageFoundationProps = {
  eyebrow: string;
  pendingCopy: string;
  pendingTitle: string;
  title: string;
};

export function CorporatePageFoundation({
  eyebrow,
  pendingCopy,
  pendingTitle,
  title,
}: CorporatePageFoundationProps) {
  return (
    <main id="main-content">
      <section className="page-foundation">
        <Container width="prose">
          <SectionHeading eyebrow={eyebrow} level="h1" title={title} />
          <aside aria-labelledby="page-foundation-status" className="page-foundation__notice">
            <h2 id="page-foundation-status">{pendingTitle}</h2>
            <p>{pendingCopy}</p>
          </aside>
        </Container>
      </section>
    </main>
  );
}
