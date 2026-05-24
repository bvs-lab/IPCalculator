import type { CSSProperties } from 'react'

const SCALE_TICKS = [0, 8, 16, 24, 32] as const

interface PrefixSliderProps {
  cidr: number
  onChange: (cidr: number) => void
}

export function PrefixSlider({ cidr, onChange }: PrefixSliderProps) {
  const fillPercent = (cidr / 32) * 100

  return (
    <div className="px-0.5">
      <input
        type="range"
        min={0}
        max={32}
        value={cidr}
        onChange={(e) => onChange(Number(e.target.value))}
        className="cidr-slider h-1.5 w-full cursor-pointer appearance-none rounded-full transition-all duration-300"
        style={{ '--cidr-fill': `${fillPercent}%` } as CSSProperties}
      />

      <div className="mt-2 flex justify-between">
        {SCALE_TICKS.map((tick) => (
          <button
            key={tick}
            type="button"
            onClick={() => onChange(tick)}
            className="group flex flex-col items-center gap-1"
            aria-label={`Установить /${tick}`}
          >
            <span
              className={`block h-2 w-px transition-colors ${
                cidr === tick ? 'bg-blue-500' : 'bg-slate-300 group-hover:bg-blue-300'
              }`}
            />
            <span
              className={`font-mono text-xs transition-colors ${
                cidr === tick
                  ? 'font-semibold text-blue-500'
                  : 'text-slate-400 group-hover:text-slate-600'
              }`}
            >
              {tick}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
