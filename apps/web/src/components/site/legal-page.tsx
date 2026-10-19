import { Container } from "@/components/design-system/container";
import { SectionHeading } from "@/components/design-system/section-heading";

type LegalPageProps = { approvalGate: string; eyebrow: string; pendingCopy: string; pendingTitle: string; title: string };

export function LegalPage({ approvalGate, eyebrow, pendingCopy, pendingTitle, title }: LegalPageProps) {
  return (
    <main id="main-content">
      <section className="legal-page">
        <Container width="prose">
          <SectionHeading eyebrow={eyebrow} level="h1" title={title} />
          <div className="legal-page__notice">
            <h2>{pendingTitle}</h2>
            <p>{pendingCopy}</p>
            <p>{approvalGate}</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
