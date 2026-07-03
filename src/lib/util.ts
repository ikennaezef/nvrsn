// Your business WhatsApp number in international format, digits only (no + or spaces).
// Nigeria example: 234 + 8012345678  ->  "2348012345678"
const WHATSAPP_NUMBER = "2349031975387";

function buildWhatsAppUrl(form: any): string {
  const lines = [
    "*New Booking Request*",
    "",
    `*Name:* ${form.fullName}`,
    `*Email:* ${form.email}`,
    `*Phone:* ${form.phone}`,
    `*Event Type:* ${form.eventType}`,
    `*Event Date:* ${form.eventDate}`,
    `*Venue:* ${form.eventVenue}`,
    `*Service:* ${form.serviceType}`,
    `*Package:* ${form.preferredPackage}`,
    form.guestCount ? `*Guests:* ${form.guestCount}` : "",
    form.additionalDetails ? `*Details:* ${form.additionalDetails}` : "",
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export { buildWhatsAppUrl };
