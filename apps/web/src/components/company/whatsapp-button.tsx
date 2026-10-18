import { MessageCircle } from "lucide-react";

type WhatsAppButtonProps = {
  label: string;
  url?: string;
};

export function WhatsAppButton({ label, url }: WhatsAppButtonProps) {
  if (!url) return null;

  return (
    <a aria-label={label} className="whatsapp-button" href={url} rel="noopener noreferrer" target="_blank">
      <MessageCircle aria-hidden="true" strokeWidth={1.8} />
      <span className="whatsapp-button__tooltip" role="tooltip">{label}</span>
    </a>
  );
}
