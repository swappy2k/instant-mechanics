
import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  Car,
  Wrench,
  Headphones,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { BRANDS, SITE, whatsappUrl } from "@/config/site";
import { BuyButton } from "@/components/SiteChrome";
import { RoadsideServices } from "@/components/RoadsideServices";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.brand} | Roadside Assistance` },
      {
        name: "description",
        content:
          "Roadside assistance for fuel delivery, battery jump starts, tyre repair, towing, vehicle servicing and mechanic help for cars, bikes, scooters, vans and more. Contact Instant Mechanics on WhatsApp.",
      },
      {
        property: "og:title",
        content: `${SITE.brand} — Roadside Assistance`,
      },
      {
        property: "og:description",
        content:
          "Roadside assistance and mechanical help for cars, bikes, scooters, vans and more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Roadside Support",
    text: "Tell us what happened and where you are.",
  },
  {
    icon: Car,
    title: "Multiple Services",
    text: "Fuel, tyres, towing, servicing and more.",
  },
  {
    icon: Wrench,
    title: "Vehicle Assistance",
    text: "Share your vehicle details and the issue.",
  },
  {
    icon: Headphones,
    title: "WhatsApp Enquiries",
    text: "Check availability, timing and pricing.",
  },
];

function Index() {
  const helpMessage =
    "Hello INSTANT MECHANICS, I need roadside assistance. " +
    "Vehicle type: ____. Vehicle make and model: ____. " +
    "Current location: ____. Problem: ____. " +
    "Please confirm service availability and pricing.";

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <img
          src="/images/hero.png"
          alt="Roadside vehicle assistance"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-overlay via-overlay/80 to-overlay/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-40">
          <p className="eyebrow mb-6">
            INSTANT MECHANICS · ROADSIDE ASSISTANCE
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-[0.95] sm:text-7xl lg:text-8xl">
            VEHICLE TROUBLE? WE&apos;RE HERE TO HELP.
          </h1>

          <p className="mt-8 max-w-lg text-base text-muted-foreground sm:text-lg">
            Roadside assistance and mechanical help for cars, bikes, scooters,
            vans and more.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={whatsappUrl(helpMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid inline-flex min-h-16 w-full items-center justify-center gap-4 px-8 text-base font-semibold tracking-widest sm:w-auto sm:min-w-80 sm:text-lg"
            >
              GET HELP NOW
              <ArrowUpRight size={22} strokeWidth={2} />
            </a>

            <a
              href="#roadside"
              className="btn-outline inline-flex min-h-14 items-center justify-center gap-3 px-7"
            >
              Explore Services
              <ArrowRight size={16} />
            </a>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Tell us your location and vehicle issue on WhatsApp.
          </p>
        </div>
      </section>

      {/* Primary roadside services */}
      <RoadsideServices />

      {/* Why contact us */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`p-8 lg:p-10 ${
                i > 0 ? "border-t border-border sm:border-t-0 lg:border-l" : ""
              } ${
                i === 1 || i === 3 ? "sm:border-l" : ""
              } ${i >= 2 ? "sm:border-t lg:border-t-0" : ""}`}
            >
              <feature.icon
                size={22}
                strokeWidth={1.5}
                className="text-silver"
              />

              <h3 className="mt-6 text-sm font-semibold">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Battery brands */}
      <section
        id="brands"
        className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24"
      >
        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <p className="eyebrow mb-4">NEED A NEW BATTERY?</p>

            <h2 className="text-4xl font-bold leading-[1.05] sm:text-5xl">
              The right battery for your vehicle.
              <br />
              Without the guesswork.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:justify-self-end">
            Explore leading automotive battery brands in one place. Tell us
            your vehicle details, and we&apos;ll help you find the right fit.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {BRANDS.map((brand) => (
            <a
              key={brand.name}
              href={whatsappUrl(
                `Hello INSTANT MECHANICS, I'm interested in a ${brand.name} automotive battery. Please check availability and pricing for my vehicle.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${brand.name} batteries on WhatsApp`}
              className="group relative flex h-28 items-center justify-center border border-border bg-graphite transition-colors duration-300 hover:border-silver/40 hover:bg-card sm:h-32"
            >
              <span className="font-display text-lg font-semibold tracking-wide text-foreground/85 transition-colors group-hover:text-foreground sm:text-2xl">
                {brand.name}
              </span>

              <ArrowUpRight
                size={16}
                className="absolute right-4 top-4 -translate-x-1 translate-y-1 text-silver opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
              />
            </a>
          ))}
        </div>

        <p className="mt-5 text-xs text-muted-foreground/80">
          Brand names are shown for identification purposes only. Availability
          is confirmed on enquiry. No official affiliation is implied.
        </p>
      </section>

      {/* Battery enquiry banner */}
      <section className="relative overflow-hidden">
        <img
          src="/images/batteries.webp"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-overlay/70" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 text-center">
          <h2 className="mx-auto max-w-2xl text-4xl font-bold sm:text-5xl">
            NEED A NEW BATTERY?
          </h2>

          <p className="mx-auto mt-6 max-w-md text-muted-foreground">
            Share your vehicle make, model, year and fuel type — we&apos;ll
            help you find the right option.
          </p>

          <div className="mt-10">
            <BuyButton label="Enquire on WhatsApp" />
          </div>
        </div>
      </section>
    </>
  );
}
