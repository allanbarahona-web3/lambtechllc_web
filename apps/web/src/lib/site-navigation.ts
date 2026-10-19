import type { Locale } from "@/lib/i18n/config";

export const corporateRouteIds = [
  "what-we-do",
  "technology",
  "manufacturers",
  "latam",
  "about",
  "contact",
] as const;

export const primaryNavigationRouteIds = [
  "what-we-do",
  "technology",
  "about",
  "contact",
] as const;

export const legalRouteIds = ["privacy", "terms", "cookies"] as const;

export type CorporateRouteId = (typeof corporateRouteIds)[number];
export type PrimaryNavigationRouteId = (typeof primaryNavigationRouteIds)[number];
export type LegalRouteId = (typeof legalRouteIds)[number];
export type SiteRouteId = CorporateRouteId | LegalRouteId;

export function getRouteHref(locale: Locale, route: SiteRouteId) {
  return `/${locale}/${route}`;
}

export function isCorporateRoute(value: string): value is CorporateRouteId {
  return corporateRouteIds.includes(value as CorporateRouteId);
}

export function isLegalRoute(value: string): value is LegalRouteId {
  return legalRouteIds.includes(value as LegalRouteId);
}
