export type SocialPlatform = "facebook" | "instagram" | "linkedin" | "whatsapp" | "youtube";

export type PublicPartnerLogo = {
  name: string;
  src: string;
};

function optionalValue(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function publicHttpUrl(value: string | undefined) {
  const candidate = optionalValue(value);
  if (!candidate) return undefined;

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function publicEmail(value: string | undefined) {
  const candidate = optionalValue(value);
  return candidate && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) ? candidate : undefined;
}

function publicPhone(value: string | undefined) {
  const candidate = optionalValue(value);
  return candidate && /\d/.test(candidate) ? candidate : undefined;
}

function partnerLogos(value: string | undefined): PublicPartnerLogo[] {
  const candidates = optionalValue(value)?.split(";") ?? [];

  return candidates.flatMap((candidate) => {
    const [name, rawUrl] = candidate.split("|", 2).map((part) => part.trim());
    const src = publicHttpUrl(rawUrl);
    return name && src ? [{ name, src }] : [];
  });
}

const social = {
  facebook: publicHttpUrl(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  instagram: publicHttpUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  linkedin: publicHttpUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  whatsapp: publicHttpUrl(process.env.NEXT_PUBLIC_WHATSAPP_URL),
  youtube: publicHttpUrl(process.env.NEXT_PUBLIC_YOUTUBE_URL),
} satisfies Record<SocialPlatform, string | undefined>;

export const publicCompany = {
  address: optionalValue(process.env.NEXT_PUBLIC_COMPANY_ADDRESS),
  email: publicEmail(process.env.NEXT_PUBLIC_COMPANY_EMAIL),
  location: "Wyoming, USA",
  media: {
    heroImageUrl:
      publicHttpUrl(process.env.NEXT_PUBLIC_LAMBTECH_HERO_IMAGE_URL) ??
      "https://barmentech-saas.atl1.digitaloceanspaces.com/LAMBTECH-WEBSIDE/Hero%20Desktop%20Lambtech%20Web.svg",
  },
  name: "LAMBTECH LLC",
  partnerLogos: partnerLogos(process.env.NEXT_PUBLIC_PARTNER_LOGOS),
  phone: publicPhone(process.env.NEXT_PUBLIC_COMPANY_PHONE),
  social,
  whatsappUrl: social.whatsapp,
} as const;

export function telephoneHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
