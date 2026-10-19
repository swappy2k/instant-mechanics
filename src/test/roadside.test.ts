import { describe, expect, it } from "vitest";
import { roadsideMessage, roadsideSchema, SERVICES, type RoadsideRequest } from "@/config/roadside";
import { whatsappUrl } from "@/config/site";

const request: RoadsideRequest = { service: "jump", name: "Riya", phone: "+91 98765 43210", vehicle: "Hyundai Creta", location: "Andheri station", problem: "Battery is flat", urgency: "As soon as available" };

describe("Roadside enquiries", () => {
  it.each(SERVICES)("carries the selected $title service and supplied details to the existing number", (service) => {
    const message = roadsideMessage({ ...request, service: service.id });
    const url = new URL(whatsappUrl(message));
    expect(url.origin + url.pathname).toBe("https://wa.me/918104387975");
    expect(url.searchParams.get("text")).toBe(message);
    for (const detail of [service.title, "Riya", "+91 98765 43210", "Hyundai Creta", "Andheri station", "Battery is flat", "As soon as available"]) expect(message).toContain(detail);
  });
  it.each(["name", "phone", "vehicle", "location", "problem"] as const)("rejects an empty required %s", (field) => {
    expect(roadsideSchema.safeParse({ ...request, [field]: " " }).success).toBe(false);
  });
  it("rejects unsupported services and invalid phone numbers", () => {
    expect(roadsideSchema.safeParse({ ...request, service: "dispatch" }).success).toBe(false);
    expect(roadsideSchema.safeParse({ ...request, phone: "not a phone" }).success).toBe(false);
  });
  it("requires provider confirmation rather than creating a booking", () => {
    expect(roadsideMessage(request)).toContain("Please confirm availability, estimated arrival time and price before any booking.");
  });
  it("limits fuel enquiries to legally permitted delivery through an appropriate provider", () => {
    expect(roadsideMessage({ ...request, service: "fuel" })).toContain("Fuel delivery is requested only where legally permitted, through an appropriate provider.");
    expect(roadsideMessage(request)).not.toContain("Fuel delivery is requested");
  });
  it("rejects oversized input before constructing a WhatsApp URL", () => {
    expect(() => roadsideMessage({ ...request, problem: "x".repeat(1001) })).toThrow();
  });
});