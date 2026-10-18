"use client";

import { useRef, useState } from "react";

export type ContactFormLabels = {
  company: string;
  country: string;
  email: string;
  errors: { email: string; message: string; name: string };
  honeypot: string;
  inactive: string;
  message: string;
  name: string;
  notice: string;
  required: string;
  submit: string;
  title: string;
  validationSummary: string;
};

export function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

  function validate() {
    const form = formRef.current;
    if (!form) return;

    const values = new FormData(form);
    const nextErrors: Record<string, string> = {};
    const name = String(values.get("name") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const message = String(values.get("message") ?? "").trim();

    if (!name) nextErrors.name = labels.errors.name;
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = labels.errors.email;
    if (!message) nextErrors.message = labels.errors.message;

    setErrors(nextErrors);
    setStatus(Object.keys(nextErrors).length ? labels.validationSummary : labels.inactive);
  }

  return (
    <form aria-describedby="contact-form-notice contact-form-status" className="contact-form" noValidate ref={formRef}>
      <p className="contact-form__title">{labels.title}</p>
      <p className="contact-form__notice" id="contact-form-notice">{labels.notice}</p>
      <div className="contact-form__grid">
        <Field error={errors.name} label={labels.name} name="name" requiredLabel={labels.required} required />
        <Field label={labels.company} name="company" />
        <Field error={errors.email} label={labels.email} name="email" requiredLabel={labels.required} required type="email" />
        <Field label={labels.country} name="country" />
        <Field error={errors.message} label={labels.message} name="message" requiredLabel={labels.required} required textarea />
        <div className="contact-form__honeypot" hidden>
          <input aria-label={labels.honeypot} autoComplete="off" id="contact-website" name="website" tabIndex={-1} type="text" />
        </div>
      </div>
      <div className="contact-form__actions">
        <button className="button-link button-link--primary" onClick={validate} type="button">{labels.submit}</button>
        <p aria-live="polite" id="contact-form-status" role="status">{status}</p>
      </div>
    </form>
  );
}

type FieldProps = {
  error?: string;
  label: string;
  name: string;
  required?: boolean;
  requiredLabel?: string;
  textarea?: boolean;
  type?: "email" | "text";
};

function Field({ error, label, name, required, requiredLabel, textarea, type = "text" }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className={textarea ? "contact-form__field contact-form__field--full" : "contact-form__field"}>
      <label htmlFor={id}>{label}{required ? <span aria-label={requiredLabel}> *</span> : null}</label>
      {textarea ? (
        <textarea aria-describedby={error ? errorId : undefined} aria-invalid={Boolean(error)} id={id} name={name} rows={5} />
      ) : (
        <input aria-describedby={error ? errorId : undefined} aria-invalid={Boolean(error)} id={id} name={name} type={type} />
      )}
      {error ? <p className="contact-form__error" id={errorId}>{error}</p> : null}
    </div>
  );
}
