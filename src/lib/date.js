export function formatDate(date) {
  if (!date) return "-"

  const d = new Date(date)

  if (isNaN(d.getTime())) return "-"

  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}