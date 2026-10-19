
 // Central site settings — edit here to change brand, contact details and brands.
export const SITE = {
  brand: "INSTANT MECHANICS",
  // International format, digits only, no "+".
  whatsappNumber: "917417624798",
  phone: "+91 74176 24798",
  email: "hello@shybatteryservice.example",
  address: "Business address — to be updated",
};

export const BRANDS: { name: string; note: string }[] = [
  { name: "Amaron", note: "Car & SUV" },
  { name: "Exide", note: "Car & SUV" },
  { name: "Bosch", note: "Car & SUV" },
  { name: "Tata Green", note: "Car & SUV" },
  { name: "SF Sonic", note: "Car & SUV" },
  { name: "Luminous", note: "Car & SUV" },
];

export const BUY_MESSAGE =
  "Hello, I'm interested in purchasing a vehicle battery. Please help me find the right battery for my vehicle.\n\n" +
  "Vehicle make & model:\nManufacturing year:\nFuel type:\nPreferred battery brand:\nDelivery / installation needed:";

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type Enquiry = {
  name: string;
  phone: string;
  vehicle: string;
  requirement: string;
};

export function validateEnquiry(
  e: Enquiry
): Partial<Record<keyof Enquiry, string>> {
  const errors: Partial<Record<keyof Enquiry, string>> = {};
  if (e.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^\+?[0-9\s-]{8,15}$/.test(e.phone.trim()))
    errors.phone = "Enter a valid phone number.";
  if (e.vehicle.trim().length < 2)
    errors.vehicle = "Please enter your vehicle model.";
  if (e.requirement.trim().length < 3)
    errors.requirement = "Tell us what you need.";
  return errors;
}

export function enquiryMessage(e: Enquiry) {
  return `Hello ${SITE.brand}, I'd like a battery enquiry.\n\nName: ${e.name.trim()}\nPhone: ${e.phone.trim()}\nVehicle model: ${e.vehicle.trim()}\nRequirement: ${e.requirement.trim()}`;
}
