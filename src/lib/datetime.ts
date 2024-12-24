export function formatDate(date: Date | undefined) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-UK", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}
