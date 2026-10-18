import type { Locale } from "@/lib/i18n/config";

export const plannedSectionIds = [
  "what-we-do",
  "technology",
  "about",
  "contact",
] as const;

export type PlannedSectionId = (typeof plannedSectionIds)[number];

export function getPlannedSectionHref(locale: Locale, section: PlannedSectionId) {
  return `/${locale}#${section}`;
}
