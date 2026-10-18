import type { SocialPlatform } from "@/config/public-company";

type SocialLinksProps = {
  label: string;
  labels: Record<SocialPlatform, string>;
  links: Record<SocialPlatform, string | undefined>;
};

const socialOrder: SocialPlatform[] = ["linkedin", "facebook", "instagram", "youtube", "whatsapp"];

const socialMarks: Record<SocialPlatform, string> = {
  facebook: "f",
  instagram: "◎",
  linkedin: "in",
  whatsapp: "◔",
  youtube: "▶",
};

export function SocialLinks({ label, labels, links }: SocialLinksProps) {
  const available = socialOrder.filter((platform) => links[platform]);
  if (!available.length) return null;

  return (
    <nav aria-label={label} className="social-links">
      <ul>
        {available.map((platform) => (
          <li key={platform}>
            <a aria-label={labels[platform]} href={links[platform]} rel="noopener noreferrer" target="_blank">
              <span aria-hidden="true">{socialMarks[platform]}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
