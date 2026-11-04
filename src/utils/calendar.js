import { EVENT_END, EVENT_START, invitation } from "../data/invitation";

// Formats a timestamp as YYYYMMDDTHHMMSSZ (UTC), as required by ICS and Google Calendar.
const toUtcStamp = (ms) =>
  new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function getGoogleCalendarUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: invitation.calendarTitle,
    dates: `${toUtcStamp(EVENT_START)}/${toUtcStamp(EVENT_END)}`,
    details: invitation.calendarDetails,
    location: invitation.venue.fullAddress,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcs() {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Nikah Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:nikah-20261122-1200ist@invitation",
    `DTSTAMP:${toUtcStamp(Date.now())}`,
    `DTSTART:${toUtcStamp(EVENT_START)}`,
    `DTEND:${toUtcStamp(EVENT_END)}`,
    `SUMMARY:${invitation.calendarTitle}`,
    `LOCATION:${invitation.venue.name}, ${invitation.venue.fullAddress}`,
    `DESCRIPTION:${invitation.calendarDetails}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "nikah-invitation.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
