import { Container } from "@/components/design-system/container";

type HomeIntroductionProps = { copy: string };

export function HomeIntroduction({ copy }: HomeIntroductionProps) {
  return (
    <section aria-label="Introduction" className="home-introduction">
      <Container>
        <p>{copy}</p>
      </Container>
    </section>
  );
}
