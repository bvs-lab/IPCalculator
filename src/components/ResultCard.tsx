import type { ReactNode } from 'react'
import { CardIcon } from './CardIcon'

type CardIconType = 'ip' | 'network' | 'hosts' | 'binary'

interface ResultCardProps {
  title: string
  icon: CardIconType
  children: ReactNode
  className?: string
}

export function ResultCard({ title, icon, children, className = '' }: ResultCardProps) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm shadow-blue-100/40 ${className}`}
    >
      <header className="flex items-center gap-2 border-b border-gray-100 bg-blue-50/60 px-4 py-3">
        <CardIcon type={icon} />
        <h2 className="text-xs font-semibold tracking-wider text-blue-500">{title}</h2>
      </header>
      <div>{children}</div>
    </section>
  )
}
