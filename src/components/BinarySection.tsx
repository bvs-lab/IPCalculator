import type { IpCalculationResult } from '../lib/ipCalculator'
import { CopyableBinary } from './CopyableBinary'
import { ResultCard } from './ResultCard'

interface BinarySectionProps {
  result: IpCalculationResult
}

function BinaryRow({
  label,
  binary,
  networkBits,
}: {
  label: string
  binary: string
  networkBits: number
}) {
  return (
    <div className="border-b border-gray-100 px-4 py-3.5 last:border-b-0">
      <p className="mb-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
        {label}
      </p>
      <CopyableBinary binary={binary} networkBits={networkBits} size="md" />
    </div>
  )
}

export function BinarySection({ result }: BinarySectionProps) {
  return (
    <ResultCard title="ДВОИЧНОЕ ПРЕДСТАВЛЕНИЕ" icon="binary">
      <BinaryRow label="IP" binary={result.ipBinary} networkBits={result.networkBits} />
      <BinaryRow
        label="МАСКА"
        binary={result.subnetMaskBinary}
        networkBits={result.networkBits}
      />
      <BinaryRow
        label="СЕТЬ"
        binary={result.networkBinary}
        networkBits={result.networkBits}
      />
      <BinaryRow
        label="ШИРОКОВЕЩ."
        binary={result.broadcastBinary}
        networkBits={result.networkBits}
      />
    </ResultCard>
  )
}
