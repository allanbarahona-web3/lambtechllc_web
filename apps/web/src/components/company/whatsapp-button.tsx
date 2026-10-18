type WhatsAppButtonProps = {
  label: string;
  url?: string;
};

export function WhatsAppButton({ label, url }: WhatsAppButtonProps) {
  if (!url) return null;

  return (
    <a aria-label={label} className="whatsapp-button" href={url} rel="noopener noreferrer" target="_blank">
      <span aria-hidden="true">◔</span>
      <span>{label}</span>
    </a>
  );
}
