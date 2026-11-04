import { invitation } from "../data/invitation";

export function buildInviteMessage(t) {
  const currentUrl =
    typeof window !== "undefined" && window.location.href
      ? window.location.href
      : invitation.siteUrl;

  return t.waMessage
    .replace("{groom}", invitation.groom.name)
    .replace("{bride}", invitation.bride.name)
    .replace("{date}", t.dateText)
    .replace("{time}", t.timeText)
    .replace("{venue}", t.venueShort)
    .replace("{url}", currentUrl);
}

// wa.me works on WhatsApp mobile and WhatsApp Web.
export function buildWhatsAppUrl(t) {
  return `https://wa.me/?text=${encodeURIComponent(buildInviteMessage(t))}`;
}

export function buildRsvpWhatsAppUrl(t, optionLabel, guestName = "") {
  const namePart = guestName.trim() ? ` from ${guestName.trim()}` : "";
  const message = `Assalamu Alaikum!\n\nRSVP Confirmation${namePart} for the Nikkah of ${invitation.groom.name} & ${invitation.bride.name}:\n\nStatus: ${optionLabel}\nDate: ${t.dateText}\nVenue: ${t.venueShort}\n\nJazakallah Khair!`;

  const phone = invitation.whatsappContact ? invitation.whatsappContact.replace(/\D/g, "") : "";
  const target = phone ? `https://wa.me/${phone}` : `https://wa.me/`;
  return `${target}?text=${encodeURIComponent(message)}`;
}
