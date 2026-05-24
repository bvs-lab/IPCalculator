import { useState } from 'react'
import { CopyableBinary } from './CopyableBinary'
import { CopyIcon } from './CopyIcon'

interface ResultFieldProps {
  label: string
  value: string
  binary?: string
  networkBits?: number
  valueClassName?: string
  mono?: boolean
}

export function ResultField({
  label,
  value,
  binary,
  networkBits = 0,
  valueClassName = 'text-gray-900',
  mono = true,
}: ResultFieldProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyValue = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="border-b border-gray-100 px-4 py-3.5 last:border-b-0">
      <button
        type="button"
        onClick={handleCopyValue}
        className="group flex w-full items-start justify-between gap-4 text-left transition-colors hover:opacity-90"
        title="Нажмите, чтобы скопировать"
      >
        <span className="shrink-0 pt-0.5 text-sm text-gray-500">{label}</span>
        <span className="inline-flex items-center gap-2">
          <span
            className={`text-sm font-semibold ${mono ? 'font-mono' : ''} ${valueClassName}`}
          >
            {value}
          </span>
          <span
            className={`shrink-0 transition-colors ${copied ? 'text-green-500' : 'text-gray-300 group-hover:text-blue-400'}`}
          >
            {copied ? (
              <span className="text-xs font-medium">✓</span>
            ) : (
              <CopyIcon className="h-3.5 w-3.5" />
            )}
          </span>
        </span>
      </button>

      {binary !== undefined && (
        <div className="mt-2 w-full">
          <CopyableBinary binary={binary} networkBits={networkBits} />
        </div>
      )}
    </div>
  )
}
