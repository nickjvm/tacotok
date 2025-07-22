export default function getDenverDate(now: Date): Date {
  // Get the parts of the date in the America/Denver timezone
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).formatToParts(now);

  const map: { [key: string]: number } = {};
  parts.forEach((part) => {
    if (part.type !== "literal") {
      map[part.type] = parseInt(part.value, 10);
    }
  });

  // Construct a new Date object in UTC, reflecting the local Denver time
  return new Date(
    Date.UTC(map.year, map.month - 1, map.day, map.hour, map.minute, map.second)
  );
}
