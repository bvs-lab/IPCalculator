import { useState } from 'react'
import { BinaryLine } from './BinaryLine'
import { CopyIcon } from './CopyIcon'

interface CopyableBinaryProps {
  binary: string
  networkBits: number
  size?: 'sm' | 'md'
  className?: string
}

export function CopyableBinary({
  binary,
  networkBits,
  size = 'sm',
  className = '',
}: CopyableBinaryProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(binary)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`group flex w-full items-start gap-2 text-left transition-colors hover:opacity-90 ${className}`}
      title="Нажмите, чтобы скопировать двоичное представление"
    >
      <span className="min-w-0 flex-1 text-left">
        <BinaryLine binary={binary} networkBits={networkBits} size={size} />
      </span>
      <span
        className={`shrink-0 pt-0.5 transition-colors ${copied ? 'text-green-500' : 'text-gray-300 group-hover:text-blue-400'}`}
      >
        {copied ? (
          <span className="text-xs font-medium">✓</span>
        ) : (
          <CopyIcon className="h-3.5 w-3.5" />
        )}
      </span>
    </button>
  )
}
