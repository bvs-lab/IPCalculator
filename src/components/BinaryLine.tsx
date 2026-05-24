interface BinaryLineProps {
  binary: string
  networkBits: number
  size?: 'sm' | 'md'
}

export function BinaryLine({ binary, networkBits, size = 'sm' }: BinaryLineProps) {
  const octets = binary.split('.')
  const textSize = size === 'md' ? 'text-sm' : 'text-[11px] leading-5'

  return (
    <span className={`block text-left font-mono ${textSize} tracking-tight`}>
      {octets.map((octet, octetIndex) => (
        <span key={octetIndex}>
          {octetIndex > 0 && <span className="text-gray-300"> . </span>}
          {octet.split('').map((bit, bitIndex) => {
            const globalIndex = octetIndex * 8 + bitIndex
            const isNetwork = globalIndex < networkBits
            return (
              <span
                key={bitIndex}
                className={isNetwork ? 'text-blue-600' : 'text-gray-400'}
              >
                {bit}
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}
