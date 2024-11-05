/* eslint-disable @typescript-eslint/no-explicit-any */
export function formatDuration(totalMinutes: any) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${
      minutes > 1 ? "s" : ""
    }`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }
}

// // Examples
// console.log(formatDuration(80)); // "1 hour 20 minutes"
// console.log(formatDuration(60)); // "1 hour"
// console.log(formatDuration(45)); // "45 minutes"
