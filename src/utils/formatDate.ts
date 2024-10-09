export function formatDate(timestamp: string | number | Date): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    // timeZone: "UTC",
    // timeZoneName: "short",
  };
  return date.toLocaleDateString("en-US", options);
}
