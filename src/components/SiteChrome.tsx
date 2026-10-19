
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { SITE, BUY_MESSAGE, whatsappUrl } from "@/config/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const CONTACT_NUMBERS = [
  {
    label: "WhatsApp / Roadside Assistance",
    number: "+91 74176 24798",
    tel: "+917417624798",
  },
  {
    label: "Additional Contact",
    number: "+91 81043 87975",
    tel: "+918104387975",
  },
];


const HELP_MESSAGE =
  "Hi Instant Mechanics! I need roadside assistance. Please let me know the availability and pricing. Thank you!";


export function BuyButton({
  variant = "solid",
  label = "Enquire About Batteries",
}: {
  variant?: "solid" | "outline";
  label?: string;
}) {
  return (
    <a
      href={whatsappUrl(BUY_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={variant === "solid" ? "btn-solid" : "btn-outline"}
    >
      {label}
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080909]/95 text-white shadow-lg shadow-black/20 backdrop-blur-xl">
      <div className="mx-auto flex min-h-24 max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <Link
          to="/"
          aria-label="Instant Mechanics home"
          className="flex shrink-0 items-center gap-3 sm:gap-4"
        >
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-black sm:h-[60px] sm:w-[60px]">
            <img
              src="/images/instant-mechanics-logo.png"
              alt="Instant Mechanics fist-and-wrench logo"
              className="h-full w-full object-contain"
            />
          </span>

          <span className="flex flex-col items-start leading-none">
            <span className="font-display text-lg font-bold tracking-[0.06em] text-white sm:text-xl">
              INSTANT
            </span>
            <span className="mt-2 text-xs font-medium tracking-[0.16em] text-white/65 sm:text-sm">
              MECHANICS
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex lg:gap-10">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="text-xs uppercase tracking-[0.2em] text-white/65 transition-colors hover:text-white"
              activeProps={{ className: "text-white" }}
            >
              {n.label}
            </Link>
          ))}

          <a
            href={whatsappUrl(HELP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-black transition-colors hover:bg-white/85"
          >
            Get Help Now <ArrowUpRight size={15} />
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-white transition-colors hover:bg-white/10 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-5 border-t border-white/10 bg-[#080909] px-6 py-6 md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-[0.2em] text-white/75 hover:text-white"
            >
              {n.label}
            </Link>
          ))}

          <a
            href={whatsappUrl(HELP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-14 items-center justify-center gap-2 bg-white px-5 py-4 text-sm font-bold uppercase tracking-[0.15em] text-black"
          >
            Get Help Now <ArrowUpRight size={17} />
          </a>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-graphite">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-3"
            aria-label="Instant Mechanics home"
          >
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-black">
              <img
                src="/images/instant-mechanics-logo.png"
                alt="Instant Mechanics fist-and-wrench logo"
                className="h-full w-full object-contain"
              />
            </span>

            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-[0.06em]">
                INSTANT
              </span>
              <span className="mt-1 text-xs tracking-[0.16em] text-muted-foreground">
                MECHANICS
              </span>
            </span>
          </Link>

          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Roadside assistance and mechanical help for cars, bikes, scooters,
            vans and more.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-5">Navigate</p>
          <ul className="space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-5">Contact</p>
          <ul className="space-y-4 text-sm text-muted-foreground">
            {CONTACT_NUMBERS.map((contact) => (
              <li key={contact.tel} className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-muted-foreground/70">
                  {contact.label}
                </span>
                <a
                  href={`tel:${contact.tel}`}
                  className="inline-flex items-center gap-2 text-base transition-colors hover:text-foreground"
                >
                  <Phone size={15} />
                  {contact.number}
                </a>
              </li>
            ))}

            <li>
              <a
                href={whatsappUrl(HELP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                WhatsApp roadside assistance
                <ArrowUpRight size={14} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs tracking-[0.1em] text-muted-foreground">
        © {new Date().getFullYear()} {SITE.brand}. All rights reserved. Brand
        names are trademarks of their respective owners.
      </div>
    </footer>
  );
}
