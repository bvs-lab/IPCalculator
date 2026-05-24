interface AddressStructureBarProps {
  networkBits: number
  hostBits: number
}

export function AddressStructureBar({ networkBits, hostBits }: AddressStructureBarProps) {
  const networkPercent = (networkBits / 32) * 100
  const hostPercent = (hostBits / 32) * 100

  return (
    <section className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm shadow-blue-100/40">
      <header className="flex items-center gap-2 border-b border-gray-100 bg-blue-50/60 px-4 py-3">
        <svg
          className="h-4 w-4 text-blue-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
        <h2 className="text-xs font-semibold tracking-wider text-blue-500">СТРУКТУРА АДРЕСА</h2>
      </header>
      <div className="px-4 py-4">
        <div className="flex h-9 w-full overflow-hidden rounded-lg">
          {networkBits > 0 && (
            <div
              className="flex items-center justify-center bg-blue-500 text-xs font-medium text-white transition-all duration-300 ease-out"
              style={{ width: `${networkPercent}%` }}
            >
              {networkPercent >= 12 && `Сеть (${networkBits})`}
            </div>
          )}
          {hostBits > 0 && (
            <div
              className="flex items-center justify-center bg-blue-100 text-xs font-medium text-blue-700 transition-all duration-300 ease-out"
              style={{ width: `${hostPercent}%` }}
            >
              {hostPercent >= 12 && `Хост (${hostBits})`}
            </div>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-6 text-sm text-gray-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            Биты сети: {networkBits}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-200" />
            Биты хоста: {hostBits}
          </span>
        </div>
      </div>
    </section>
  )
}
