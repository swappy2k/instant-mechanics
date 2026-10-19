
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRoadsideAssistance } from "@/components/RoadsideAssistanceProvider";
import { SERVICES } from "@/config/roadside";

const PHOTOS: Record<string, { src: string; alt: string }> = {
  fuel: {
    src: "/images/roadside-fuel.jpg",
    alt: "Fuel delivery for a vehicle",
  },
  jump: {
    src: "/images/roadside-jump.jpg",
    alt: "Jumper cables connected to a vehicle battery",
  },
  tyre: {
    src: "/images/roadside-tyre.jpg",
    alt: "Mechanic repairing a vehicle tyre",
  },
  towing: {
    src: "/images/roadside-towing.webp",
    alt: "Vehicle being loaded onto a flatbed tow truck",
  },
  servicing: {
    src: "/images/roadside-servicing.jpg",
    alt: "Vehicle being checked in a service workshop",
  },
  mechanic: {
    src: "/images/roadside-mobile-mechanic.jpg",
    alt: "Mechanic checking a vehicle beside the road",
  },
};

export function RoadsideServices() {
  const request = useRoadsideAssistance();

  return (
    <section
      id="roadside"
      aria-labelledby="roadside-heading"
      className="border-t border-border bg-graphite"
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <p className="eyebrow mb-4">Roadside Assistance</p>
            <h2
              id="roadside-heading"
              className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl"
            >
              HELP WHEN YOU NEED IT MOST.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:justify-self-end">
            From a dead battery to an unexpected breakdown, enquire about help for cars, bikes, scooters, vans and more.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const photo = PHOTOS[service.id];

            return (
              <article
                key={service.id}
                className="group flex flex-col overflow-hidden border border-border bg-background transition-colors duration-300 hover:border-silver/40"
              >
                <div className="aspect-[3/2] overflow-hidden bg-graphite">
                  {photo && (
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      width={1200}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 min-h-20 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => request(service.id)}
                    className="btn-outline mt-6 h-auto w-full whitespace-normal rounded-none px-4"
                  >
                    {service.action}
                    <ArrowUpRight size={16} />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Requests are enquiries, not confirmed bookings. The service provider
          must confirm availability, estimated arrival time and price. A
          location or nearby landmark is sufficient; precise location sharing
          is voluntary.
        </p>
      </div>
    </section>
  );
}
