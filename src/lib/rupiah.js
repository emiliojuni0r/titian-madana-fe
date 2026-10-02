export function formatRupiah(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 'Rp0';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}


export function formatRupiahShort(value) {
  if (value == null || isNaN(value)) return "Rp 0"

  if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000)
      .toFixed(1)
      .replace(".0", "")} M`
  }

  if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000)
      .toFixed(1)
      .replace(".0", "")} jt`
  }

  if (value >= 1_000) {
    return `Rp ${(value / 1_000)
      .toFixed(1)
      .replace(".0", "")} rb`
  }

  return `Rp ${value.toLocaleString("id-ID")}`
}