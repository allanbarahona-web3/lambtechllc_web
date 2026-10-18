import { publicCompany, telephoneHref } from "@/config/public-company";

type ContactDetailsProps = {
  className?: string;
  labels: { address: string; email: string; phone: string; whatsapp: string };
};

export function ContactDetails({ className, labels }: ContactDetailsProps) {
  const hasDetails = publicCompany.email || publicCompany.phone || publicCompany.address || publicCompany.whatsappUrl;
  if (!hasDetails) return null;

  return (
    <address className={["contact-details", className].filter(Boolean).join(" ")}>
      {publicCompany.email ? <a href={`mailto:${publicCompany.email}`}>{labels.email}: {publicCompany.email}</a> : null}
      {publicCompany.phone ? <a href={telephoneHref(publicCompany.phone)}>{labels.phone}: {publicCompany.phone}</a> : null}
      {publicCompany.address ? <p>{labels.address}: {publicCompany.address}</p> : null}
      {publicCompany.whatsappUrl ? (
        <a href={publicCompany.whatsappUrl} rel="noopener noreferrer" target="_blank">{labels.whatsapp}</a>
      ) : null}
    </address>
  );
}
