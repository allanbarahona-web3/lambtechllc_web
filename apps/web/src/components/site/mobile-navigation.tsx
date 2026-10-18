"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { PlannedSectionId } from "@/lib/site-navigation";

type MobileNavigationProps = {
  closeLabel: string;
  currentLocale: Locale;
  englishLabel: string;
  items: Array<{ id: PlannedSectionId; label: string }>;
  languageLabel: string;
  navigationLabel: string;
  openLabel: string;
  spanishLabel: string;
};

export function MobileNavigation({
  closeLabel,
  currentLocale,
  englishLabel,
  items,
  languageLabel,
  navigationLabel,
  openLabel,
  spanishLabel,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function closeMenu(restoreFocus = false) {
    setIsOpen(false);

    if (restoreFocus) {
      buttonRef.current?.focus();
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    panelRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const menuLabel = isOpen ? closeLabel : openLabel;

  return (
    <div className="site-header__mobile">
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={menuLabel}
        className="menu-button"
        onClick={() => setIsOpen((open) => !open)}
        ref={buttonRef}
        type="button"
      >
        <span aria-hidden="true" className="menu-button__icon">
          <span />
          <span />
        </span>
        <span className="sr-only">{menuLabel}</span>
      </button>

      {isOpen ? (
        <div
          className="mobile-navigation"
          id="mobile-navigation"
          ref={panelRef}
          tabIndex={-1}
        >
          <nav aria-label={navigationLabel}>
            <ul className="mobile-navigation__list">
              {items.map((item) => (
                <li key={item.id}>
                  <span aria-disabled="true" className="mobile-navigation__deferred-item">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={languageLabel} className="mobile-navigation__language">
            <ul>
              <li>
                <Link
                  aria-current={currentLocale === "en" ? "page" : undefined}
                  aria-label={englishLabel}
                  href="/en"
                  hrefLang="en"
                  lang="en"
                  onClick={() => closeMenu()}
                >
                  EN
                </Link>
              </li>
              <li>
                <Link
                  aria-current={currentLocale === "es" ? "page" : undefined}
                  aria-label={spanishLabel}
                  href="/es"
                  hrefLang="es"
                  lang="es"
                  onClick={() => closeMenu()}
                >
                  ES
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
