import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SITE, BUY_MESSAGE, whatsappUrl, validateEnquiry, enquiryMessage, type Enquiry } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${SITE.brand}` },
      { name: "description", content: `Contact ${SITE.brand} on WhatsApp, phone or email for roadside assistance, vehicle servicing and battery enquiries.` },
      { property: "og:title", content: `Contact ${SITE.brand}` },
      { property: "og:description", content: "Send a battery enquiry directly to WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const FIELDS: { key: keyof Enquiry; label: string; placeholder: string; type?: string }[] = [
  { key: "name", label: "Name", placeholder: "Your full name" },
  { key: "phone", label: "Phone", placeholder: "+91 98765 43210", type: "tel" },
  { key: "vehicle", label: "Vehicle Type & Model", placeholder: "e.g. Honda Activa, Hyundai Creta, Tata Ace" },
  { key: "requirement", label: "Requirement", placeholder: "Roadside service or battery enquiry…" },
];

function Contact() {
  const [values, setValues] = useState<Enquiry>({ name: "", phone: "", vehicle: "", requirement: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Enquiry, string>>>({});
  const [blocked, setBlocked] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    const errs = validateEnquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const win = window.open(whatsappUrl(enquiryMessage(values)), "_blank", "noopener");
    setBlocked(!win);
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-20 px-6 pb-28 pt-40 lg:grid-cols-2">
      <div>
        <p className="eyebrow mb-6">Contact</p>
        <h1 className="text-4xl font-bold sm:text-6xl">Tell us what help you need.</h1>
        <p className="mt-6 max-w-md text-muted-foreground">Contact us on WhatsApp with your vehicle details, location and the issue. We'll confirm service availability, estimated arrival time and pricing before any booking.</p>
        <a href={whatsappUrl(BUY_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn-solid mt-10">Enquire on WhatsApp</a>
        <dl className="mt-16 space-y-8">
          {[
            ["Phone", <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>],
            ["Email", <a href={`mailto:${SITE.email}`}>{SITE.email}</a>],
            ["Address", SITE.address],
          ].map(([k, v]) => (
            <div key={k as string} className="border-t border-border pt-5">
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-2 text-lg">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <form onSubmit={submit} noValidate className="space-y-8 border border-border bg-card p-8 sm:p-12">
        <h2 className="text-2xl font-semibold">Quick Enquiry</h2>
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label htmlFor={f.key} className="eyebrow">{f.label}</label>
            <input id={f.key} type={f.type ?? "text"} className="field" placeholder={f.placeholder}
              value={values[f.key]} aria-invalid={!!errors[f.key]}
              onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
            {errors[f.key] && <p className="mt-2 text-xs text-destructive">{errors[f.key]}</p>}
          </div>
        ))}
        <button type="submit" className="btn-solid w-full">Send via WhatsApp</button>
        {blocked && (
          <p className="text-sm text-destructive">
            WhatsApp couldn't open automatically.{" "}
            <a className="underline" href={whatsappUrl(enquiryMessage(values))} target="_blank" rel="noopener noreferrer">Tap here to open it</a>.
          </p>
        )}
      </form>
    </section>
  );
}
