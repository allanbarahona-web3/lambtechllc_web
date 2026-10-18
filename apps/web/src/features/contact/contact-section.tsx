import { Container } from "@/components/design-system/container";
import { SectionHeading } from "@/components/design-system/section-heading";
import { ContactForm, type ContactFormLabels } from "./contact-form";

type ContactPath = { copy: string; id: string; label: string; title: string };
type ContactSectionProps = {
  description: string;
  eyebrow: string;
  form: ContactFormLabels;
  paths: ContactPath[];
  title: string;
};

export function ContactSection({ description, eyebrow, form, paths, title }: ContactSectionProps) {
  return (
    <section aria-labelledby="contact-title" className="content-section content-section--subtle" id="contact">
      <Container>
        <SectionHeading description={description} eyebrow={eyebrow} title={title} titleId="contact-title" />
        <div className="contact-paths">
          {paths.map((path) => (
            <article id={`contact-${path.id}`} key={path.id}>
              <p className="eyebrow">{path.label}</p>
              <h3>{path.title}</h3>
              <p>{path.copy}</p>
            </article>
          ))}
        </div>
        <div className="contact-form-wrap" id="contact-form">
          <ContactForm labels={form} />
        </div>
      </Container>
    </section>
  );
}
