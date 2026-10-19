import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { roadsideMessage, roadsideSchema, SERVICES, type RoadsideRequest, type ServiceId } from "@/config/roadside";
import { whatsappUrl } from "@/config/site";

const FIELDS = [
  { key: "name", label: "Customer name", placeholder: "Your full name", max: 100, autoComplete: "name" },
  { key: "phone", label: "Phone number", placeholder: "+91 …", max: 15, autoComplete: "tel" },
  { key: "vehicle", label: "Vehicle make & model", placeholder: "e.g. Hyundai Creta", max: 150 },
  { key: "location", label: "Location or landmark", placeholder: "Area, road or nearest landmark", max: 250 },
] as const;

export function RoadsideRequestDialog({ initialService, onClose }: { initialService: ServiceId; onClose: () => void }) {
  const [values, setValues] = useState<RoadsideRequest>({ service: initialService, name: "", phone: "", vehicle: "", location: "", problem: "", urgency: "As soon as available" });
  const [errors, setErrors] = useState<Partial<Record<keyof RoadsideRequest, string>>>({});
  const [preparedUrl, setPreparedUrl] = useState("");

  function change(field: keyof RoadsideRequest, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setPreparedUrl("");
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = roadsideSchema.safeParse(values);
    if (!result.success) {
      const next: Partial<Record<keyof RoadsideRequest, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof RoadsideRequest;
        next[key] ??= issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    const url = whatsappUrl(roadsideMessage(result.data));
    setPreparedUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-sm p-6 sm:p-8">
        <DialogHeader className="pr-5 text-left">
          <p className="eyebrow mb-2">Roadside Assistance</p>
          <DialogTitle className="text-2xl leading-tight">Request assistance</DialogTitle>
          <DialogDescription className="pt-2 leading-relaxed">This is an enquiry, not a confirmed booking. Availability, estimated arrival time and price must be confirmed by the service provider.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} noValidate className="space-y-5">
          <div>
            <label htmlFor="roadside-service" className="eyebrow">Selected service</label>
            <select id="roadside-service" className="field" value={values.service} onChange={(event) => change("service", event.target.value)}>
              {SERVICES.map((service) => <option className="bg-background text-foreground" key={service.id} value={service.id}>{service.title}</option>)}
            </select>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {FIELDS.map((field) => (
              <div key={field.key}>
                <label htmlFor={`roadside-${field.key}`} className="eyebrow">{field.label}</label>
                <input id={`roadside-${field.key}`} required className="field" type={field.key === "phone" ? "tel" : "text"} autoComplete={"autoComplete" in field ? field.autoComplete : "off"} maxLength={field.max} placeholder={field.placeholder} value={values[field.key]} onChange={(event) => change(field.key, event.target.value)} aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key] ? `error-${field.key}` : undefined} />
                {errors[field.key] && <p id={`error-${field.key}`} role="alert" className="mt-2 text-xs text-destructive">{errors[field.key]}</p>}
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="roadside-problem" className="eyebrow">Problem description</label>
            <textarea id="roadside-problem" required rows={3} maxLength={1000} className="field resize-y" placeholder="Tell us what happened and what help you need" value={values.problem} onChange={(event) => change("problem", event.target.value)} aria-invalid={Boolean(errors.problem)} aria-describedby={errors.problem ? "error-problem" : undefined} />
            {errors.problem && <p id="error-problem" role="alert" className="mt-2 text-xs text-destructive">{errors.problem}</p>}
          </div>
          <div>
            <label htmlFor="roadside-urgency" className="eyebrow">Preferred urgency</label>
            <select id="roadside-urgency" className="field" value={values.urgency} onChange={(event) => change("urgency", event.target.value)}>
              {roadsideSchema.shape.urgency.options.map((urgency) => <option className="bg-background text-foreground" key={urgency}>{urgency}</option>)}
            </select>
          </div>
          {values.service === "fuel" && <p className="text-xs leading-relaxed text-muted-foreground">Fuel delivery is subject to local legal requirements and availability through appropriate providers.</p>}
          <Button type="submit" className="btn-solid h-auto w-full whitespace-normal rounded-none">Enquire on WhatsApp <ArrowUpRight size={16} /></Button>
          {preparedUrl && <p role="status" className="text-sm leading-relaxed text-muted-foreground">Your enquiry is ready, not booked. If WhatsApp didn’t open, <a className="text-foreground underline" href={preparedUrl} target="_blank" rel="noopener noreferrer">continue to WhatsApp</a> and send the message.</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}