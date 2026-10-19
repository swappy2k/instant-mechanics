import { z } from "zod";

export const SERVICES = [
  { id: "fuel", title: "Fuel Delivery", action: "Request Fuel", description: "Enquire about fuel delivery to your location, where legally permitted through appropriate providers." },
  { id: "jump", title: "Battery Jump Start", action: "Get Jump Start", description: "A flat battery? Request assistance to help get your vehicle started." },
  { id: "tyre", title: "Tyre Repair", action: "Fix My Tyre", description: "Request help with a puncture or flat tyre at your location." },
  { id: "towing", title: "Vehicle Towing", action: "Request Towing", description: "Enquire about moving your vehicle to a suitable workshop or destination." },
  { id: "servicing", title: "Vehicle Servicing", action: "Enquire About Servicing", description: "Discuss routine maintenance and servicing for your car, bike, van or other vehicle." },
  { id: "mechanic", title: "Instant Mechanic", action: "Get Mechanic Help", description: "Describe the problem and enquire about a mechanic visiting your location." },
] as const;

export const roadsideSchema = z.object({
  service: z.enum(["fuel", "jump", "tyre", "towing", "servicing", "mechanic"]),
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Use 100 characters or fewer."),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{8,15}$/, "Enter a valid phone number."),
  vehicle: z.string().trim().min(2, "Enter your vehicle make and model.").max(150, "Use 150 characters or fewer."),
  location: z.string().trim().min(3, "Enter your location or nearest landmark.").max(250, "Use 250 characters or fewer."),
  problem: z.string().trim().min(3, "Please describe the problem.").max(1000, "Use 1,000 characters or fewer."),
  urgency: z.enum(["As soon as available", "Today, if available", "Schedule for later"]),
});

export type RoadsideRequest = z.infer<typeof roadsideSchema>;
export type ServiceId = RoadsideRequest["service"];

export function roadsideMessage(input: RoadsideRequest) {
  const request = roadsideSchema.parse(input);
  const service = SERVICES.find((item) => item.id === request.service);
  if (!service) throw new Error("Choose a valid service.");

return `Hi Instant Mechanics! I need help with ${service.title}. Please let me know the availability and pricing. Thank you.`;
}