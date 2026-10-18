const approvedHeroImageUrl =
  "https://barmentech-saas.atl1.digitaloceanspaces.com/LAMBTECH-WEBSIDE/Hero%20Desktop%20Lambtech%20Web.svg";

export const heroMedia = {
  height: 1080,
  src: process.env.LAMBTECH_HERO_IMAGE_URL?.trim() || approvedHeroImageUrl,
  width: 1920,
} as const;
