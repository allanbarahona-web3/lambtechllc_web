type WhatsAppButtonProps = {
  label: string;
  url?: string;
};

export function WhatsAppButton({ label, url }: WhatsAppButtonProps) {
  if (!url) return null;

  return (
    <a aria-label={label} className="whatsapp-button" href={url} rel="noopener noreferrer" target="_blank">
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <path d="M12 3.25a8.75 8.75 0 0 0-7.47 13.3L3.5 20.5l4.08-1.01A8.75 8.75 0 1 0 12 3.25Z" />
        <path d="M9.08 7.77c.18-.42.37-.43.54-.44h.46c.14 0 .35.05.43.31l.66 1.56c.08.19.05.35-.03.49l-.32.44c-.08.11-.16.23-.07.42.09.18.4.67.86 1.08.59.53 1.08.69 1.27.77.19.09.3.08.41-.05l.52-.61c.12-.14.26-.17.44-.1l1.59.75c.25.12.3.23.28.43-.03.2-.22 1.16-.65 1.37-.43.22-1 .31-2.06-.16-.64-.28-1.47-.83-2.39-1.72-.71-.68-1.22-1.43-1.52-2.03-.3-.6-.06-1.22.21-1.54Z" />
      </svg>
      <span>{label}</span>
    </a>
  );
}
