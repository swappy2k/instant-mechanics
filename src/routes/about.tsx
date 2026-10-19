
import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/config/site";
import { BuyButton } from "@/components/SiteChrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${SITE.brand}` },
      {
        name: "description",
        content: `${SITE.brand} helps vehicle owners enquire about roadside assistance, vehicle maintenance and automotive batteries.`,
      },
      { property: "og:title", content: `About ${SITE.brand}` },
      {
        property: "og:description",
        content: "Reliable automotive power, quality products and personal assistance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const PILLARS = [
  {
    n: "01",
    title: "Reliable Power",
    text: "We focus on batteries from established brands so your vehicle starts with confidence.",
  },
  {
    n: "02",
    title: "Product Quality",
    text: "We recommend products suited to your vehicle's specifications and driving needs.",
  },
  {
    n: "03",
    title: "Customer Assistance",
    text: "Contact us on WhatsApp to describe your vehicle issue and ask about service availability, timing and price.",
  },
];

function About() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-40">
        <p className="eyebrow mb-6">About {SITE.brand}</p>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">
          Roadside support when your plans hit a bump.
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
          {SITE.brand} helps vehicle owners enquire about roadside services including fuel delivery, battery jump starts, tyre repair, towing, vehicle servicing and instant mechanic assistance for cars, bikes, vans and more. Battery enquiries are available too.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <img
          src="/images/install.png"
          alt="Car battery being fitted in an engine bay"
          loading="lazy"
          className="aspect-[21/9] w-full object-cover"
        />
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-28 md:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div key={pillar.n} className="border-t border-border pt-8">
            <span className="eyebrow">{pillar.n}</span>

            <h2 className="mt-4 text-2xl font-semibold">{pillar.title}</h2>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {pillar.text}
            </p>
          </div>
        ))}
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-center">
          <h2 className="text-3xl font-bold">
            Need roadside assistance?
          </h2>

          <BuyButton />
        </div>
      </section>
    </>
  );
}
