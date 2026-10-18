import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

type LocaleSwitcherProps = {
  currentLocale: Locale;
  englishLabel: string;
  label: string;
  path?: string;
  spanishLabel: string;
};

function getLocalePath(locale: Locale, path = "") {
  const suffix = path.replace(/^\/+/, "");

  return suffix ? `/${locale}/${suffix}` : `/${locale}`;
}

export function LocaleSwitcher({
  currentLocale,
  englishLabel,
  label,
  path,
  spanishLabel,
}: LocaleSwitcherProps) {
  const options: Array<{ label: string; locale: Locale }> = [
    { label: englishLabel, locale: "en" },
    { label: spanishLabel, locale: "es" },
  ];

  return (
    <nav aria-label={label} className="locale-switcher">
      <ul className="locale-switcher__list">
        {options.map((option) => (
          <li key={option.locale}>
            <Link
              aria-current={option.locale === currentLocale ? "page" : undefined}
              href={getLocalePath(option.locale, path)}
              hrefLang={option.locale}
              lang={option.locale}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
