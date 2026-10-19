import { describe, expect, it } from "vitest";

import { SITE, BUY_MESSAGE, whatsappUrl, enquiryMessage } from "@/config/site";

// The buttons on every page are plain links built by whatsappUrl, so the number and
// the encoded message are the whole contract for "clicking goes to WhatsApp".
describe("WhatsApp links", () => {
  it("points the buttons at the business number in international digits-only format", () => {
    expect(SITE.whatsappNumber).toBe("918104387975");
    expect(SITE.whatsappNumber).toMatch(/^\d{11,15}$/);
  });

  it("builds a wa.me link that opens the buy message on that number", () => {
    const url = new URL(whatsappUrl(BUY_MESSAGE));

    expect(url.origin + url.pathname).toBe("https://wa.me/918104387975");
    expect(decodeURIComponent(url.searchParams.get("text")!)).toBe(BUY_MESSAGE);
  });

  it("carries the submitted enquiry details to WhatsApp", () => {
    const text = enquiryMessage({
      name: "Riya",
      phone: "98765 43210",
      vehicle: "Hyundai Creta 2021, Diesel",
      requirement: "Installation needed",
    });

    expect(text).toContain("Name: Riya");
    expect(text).toContain("Vehicle model: Hyundai Creta 2021, Diesel");
    expect(text).toContain("Requirement: Installation needed");
  });
});
