import { useMemo, useState } from 'react'
import { AddressStructureBar } from './components/AddressStructureBar'
import { BinarySection } from './components/BinarySection'
import { InputSection } from './components/InputSection'
import { ResultCard } from './components/ResultCard'
import { ResultField } from './components/ResultField'
import {
  DEFAULT_INPUT,
  calculateFromInput,
  parseInput,
} from './lib/ipCalculator'

function ipTypeColor(type: string): string {
  if (type === 'Публичный') return 'text-orange-500'
  if (type === 'Приватный') return 'text-emerald-600'
  if (type === 'Loopback') return 'text-violet-600'
  if (type === 'Multicast') return 'text-purple-600'
  return 'text-gray-900'
}

function App() {
  const [inputValue, setInputValue] = useState(DEFAULT_INPUT)

  const parsed = useMemo(() => parseInput(inputValue), [inputValue])
  const result = useMemo(
    () => (parsed ? calculateFromInput(inputValue) : null),
    [inputValue, parsed],
  )

  const handleCidrChange = (cidr: number) => {
    if (parsed) {
      setInputValue(`${parsed.ip}/${cidr}`)
      return
    }

    const slashIndex = inputValue.lastIndexOf('/')
    const ipPart = slashIndex === -1 ? inputValue.trim() : inputValue.slice(0, slashIndex)
    setInputValue(`${ipPart}/${cidr}`)
  }

  const handleCalculate = () => {
    document.getElementById('ip-input')?.blur()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <InputSection
          value={inputValue}
          cidr={parsed?.cidr ?? 24}
          onChange={setInputValue}
          onCidrChange={handleCidrChange}
          onCalculate={handleCalculate}
          isValid={parsed !== null}
        />

        {result && (
          <div className="mt-6 space-y-4">
            <AddressStructureBar
              networkBits={result.networkBits}
              hostBits={result.hostBits}
            />

            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              <ResultCard title="IP-АДРЕС" icon="ip">
                <ResultField
                  label="IP-адрес"
                  value={result.ip}
                  binary={result.ipBinary}
                  networkBits={result.networkBits}
                />
                <ResultField
                  label="Десятичное"
                  value={result.ipDecimal.toLocaleString('ru-RU')}
                  mono={false}
                />
                <ResultField
                  label="Класс"
                  value={result.ipClass}
                  valueClassName="text-blue-600"
                  mono={false}
                />
                <ResultField
                  label="Тип"
                  value={result.ipType}
                  valueClassName={ipTypeColor(result.ipType)}
                  mono={false}
                />
              </ResultCard>

              <ResultCard title="СЕТЬ" icon="network">
                <ResultField
                  label="Адрес сети"
                  value={result.networkAddress}
                  binary={result.networkBinary}
                  networkBits={result.networkBits}
                />
                <ResultField
                  label="Широковещательный"
                  value={result.broadcastAddress}
                  binary={result.broadcastBinary}
                  networkBits={result.networkBits}
                />
                <ResultField
                  label="Маска подсети"
                  value={result.subnetMask}
                  binary={result.subnetMaskBinary}
                  networkBits={result.networkBits}
                />
                <ResultField
                  label="Wildcard маска"
                  value={result.wildcardMask}
                  binary={result.wildcardMaskBinary}
                  networkBits={result.networkBits}
                />
                <ResultField label="Запись CIDR" value={result.cidrNotation} />
              </ResultCard>

              <ResultCard title="ДИАПАЗОН ХОСТОВ" icon="hosts">
                <ResultField label="Первый хост" value={result.firstHost} />
                <ResultField label="Последний хост" value={result.lastHost} />
                <ResultField
                  label="Используемых хостов"
                  value={result.usableHosts.toLocaleString('ru-RU')}
                  valueClassName="text-green-600"
                  mono={false}
                />
                <ResultField
                  label="Всего адресов"
                  value={result.totalAddresses.toLocaleString('ru-RU')}
                  mono={false}
                />
              </ResultCard>

              <BinarySection result={result} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
