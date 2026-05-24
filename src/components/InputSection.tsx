import type { KeyboardEvent } from 'react'
import { PrefixSlider } from './PrefixSlider'
import { cidrToMaskInt, COMMON_CIDRS, intToIp } from '../lib/ipCalculator'
import { formatAddressCount } from '../lib/formatAddressCount'

interface InputSectionProps {
  value: string
  cidr: number
  onChange: (value: string) => void
  onCidrChange: (cidr: number) => void
  onCalculate: () => void
  isValid: boolean
}

export function InputSection({
  value,
  cidr,
  onChange,
  onCidrChange,
  onCalculate,
  isValid,
}: InputSectionProps) {
  const mask = intToIp(cidrToMaskInt(cidr))

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onCalculate()
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="ip-input"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="95.139.44.1/24"
            className={`min-w-0 flex-1 rounded-xl border px-4 py-3 font-mono text-base transition-colors outline-none focus:ring-2 ${
              isValid
                ? 'border-slate-200 bg-slate-50/50 focus:border-blue-400 focus:ring-blue-100'
                : 'border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-red-100'
            }`}
            spellCheck={false}
          />
          <button
            type="button"
            onClick={onCalculate}
            className="shrink-0 rounded-xl bg-blue-500 px-8 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition-colors hover:bg-blue-600 active:bg-blue-700"
          >
            Рассчитать
          </button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate-400">
          Введите IP-адрес с маской CIDR (например 10.0.0.1/8) или с маской (например
          192.168.1.1/255.255.255.0)
        </p>
        {!isValid && (
          <p className="mt-2 text-sm text-red-600">
            Неверный формат. Используйте IP/CIDR или IP/маску подсети.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-700">Длина префикса</h2>
            <p className="mt-1 font-mono text-sm text-slate-500">Маска: {mask}</p>
          </div>
          <span className="rounded-lg bg-blue-500 px-3 py-1 font-mono text-sm font-bold text-white">
            /{cidr}
          </span>
        </div>
        <PrefixSlider cidr={cidr} onChange={onCidrChange} />
      </section>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xs font-semibold tracking-widest text-slate-500">
          БЫСТРЫЙ ВЫБОР
        </h2>
        <div className="flex flex-wrap gap-2">
          {COMMON_CIDRS.map((maskCidr) => {
            const active = cidr === maskCidr
            return (
              <button
                key={maskCidr}
                type="button"
                onClick={() => onCidrChange(maskCidr)}
                className={`flex min-w-[52px] flex-col items-center rounded-full px-3 py-2 transition-all duration-200 ${
                  active
                    ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                    : 'bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="font-mono text-sm font-semibold">/{maskCidr}</span>
                <span
                  className={`mt-0.5 text-[10px] ${active ? 'text-blue-100' : 'text-slate-400'}`}
                >
                  {formatAddressCount(maskCidr)}
                </span>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
