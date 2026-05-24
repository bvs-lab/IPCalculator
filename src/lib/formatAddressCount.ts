export function formatAddressCount(cidr: number): string {
  const total = 2 ** (32 - cidr)
  if (total >= 1_000_000) {
    const millions = Math.round(total / 1_000_000)
    return `${millions}M`
  }
  if (total >= 10_000) {
    return `${Math.round(total / 1000)}K`
  }
  if (total >= 1000) {
    return total.toLocaleString('ru-RU')
  }
  return String(total)
}
