export function ipToInt(ip: string): number {
  const parts = ip.split('.').map(Number)
  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
    throw new Error('Invalid IP')
  }
  return (
    (((parts[0] << 24) >>> 0) +
      ((parts[1] << 16) >>> 0) +
      ((parts[2] << 8) >>> 0) +
      (parts[3] >>> 0)) >>>
    0
  )
}

export function intToIp(int: number): string {
  const n = int >>> 0
  return [
    (n >>> 24) & 0xff,
    (n >>> 16) & 0xff,
    (n >>> 8) & 0xff,
    n & 0xff,
  ].join('.')
}

export function ipToBinary(ip: string): string {
  return ip
    .split('.')
    .map((octet) => parseInt(octet, 10).toString(2).padStart(8, '0'))
    .join('.')
}

export function cidrToMaskInt(cidr: number): number {
  if (cidr === 0) return 0
  return (0xffffffff << (32 - cidr)) >>> 0
}

export function maskIntToCidr(mask: number): number {
  const m = mask >>> 0
  const inverted = (~m) >>> 0
  if (inverted !== 0 && (inverted & (inverted + 1)) !== 0) {
    throw new Error('Invalid mask')
  }
  let cidr = 0
  let temp = m
  while (temp & 0x80000000) {
    cidr++
    temp = (temp << 1) >>> 0
  }
  return cidr
}

export function parseInput(input: string): { ip: string; cidr: number } | null {
  const trimmed = input.trim()
  const slashIndex = trimmed.lastIndexOf('/')
  if (slashIndex === -1) return null

  const ipPart = trimmed.slice(0, slashIndex)
  const suffix = trimmed.slice(slashIndex + 1)

  try {
    ipToInt(ipPart)
  } catch {
    return null
  }

  if (/^\d{1,2}$/.test(suffix)) {
    const cidr = parseInt(suffix, 10)
    if (cidr >= 0 && cidr <= 32) {
      return { ip: ipPart, cidr }
    }
    return null
  }

  try {
    const maskInt = ipToInt(suffix)
    const cidr = maskIntToCidr(maskInt)
    return { ip: ipPart, cidr }
  } catch {
    return null
  }
}

export function getIpClass(firstOctet: number): string {
  if (firstOctet >= 1 && firstOctet <= 126) return 'A'
  if (firstOctet === 127) return 'Loopback'
  if (firstOctet >= 128 && firstOctet <= 191) return 'B'
  if (firstOctet >= 192 && firstOctet <= 223) return 'C'
  if (firstOctet >= 224 && firstOctet <= 239) return 'D'
  return 'E'
}

export function getIpType(ip: string): string {
  const [a, b] = ip.split('.').map(Number)
  if (a === 10) return 'Приватный'
  if (a === 172 && b >= 16 && b <= 31) return 'Приватный'
  if (a === 192 && b === 168) return 'Приватный'
  if (a === 127) return 'Loopback'
  if (a === 169 && b === 254) return 'Link-local'
  if (a >= 224 && a <= 239) return 'Multicast'
  return 'Публичный'
}

export interface IpCalculationResult {
  ip: string
  ipBinary: string
  networkBits: number
  hostBits: number
  ipDecimal: number
  ipClass: string
  ipType: string
  networkAddress: string
  networkBinary: string
  broadcastAddress: string
  broadcastBinary: string
  subnetMask: string
  subnetMaskBinary: string
  wildcardMask: string
  wildcardMaskBinary: string
  cidrNotation: string
  firstHost: string
  lastHost: string
  usableHosts: number
  totalAddresses: number
}

export function calculateIpNetwork(ip: string, cidr: number): IpCalculationResult {
  const ipInt = ipToInt(ip) >>> 0
  const maskInt = cidrToMaskInt(cidr)
  const networkInt = (ipInt & maskInt) >>> 0
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0
  const wildcardInt = (~maskInt >>> 0) >>> 0

  const totalAddresses = 2 ** (32 - cidr)
  let usableHosts: number
  let firstHostInt: number
  let lastHostInt: number

  if (cidr === 32) {
    usableHosts = 1
    firstHostInt = networkInt
    lastHostInt = networkInt
  } else if (cidr === 31) {
    usableHosts = 2
    firstHostInt = networkInt
    lastHostInt = broadcastInt
  } else {
    usableHosts = totalAddresses - 2
    firstHostInt = networkInt + 1
    lastHostInt = broadcastInt - 1
  }

  const firstOctet = parseInt(ip.split('.')[0], 10)

  return {
    ip,
    ipBinary: ipToBinary(ip),
    networkBits: cidr,
    hostBits: 32 - cidr,
    ipDecimal: ipInt,
    ipClass: getIpClass(firstOctet),
    ipType: getIpType(ip),
    networkAddress: intToIp(networkInt),
    networkBinary: ipToBinary(intToIp(networkInt)),
    broadcastAddress: intToIp(broadcastInt),
    broadcastBinary: ipToBinary(intToIp(broadcastInt)),
    subnetMask: intToIp(maskInt),
    subnetMaskBinary: ipToBinary(intToIp(maskInt)),
    wildcardMask: intToIp(wildcardInt),
    wildcardMaskBinary: ipToBinary(intToIp(wildcardInt)),
    cidrNotation: `${intToIp(networkInt)}/${cidr}`,
    firstHost: intToIp(firstHostInt),
    lastHost: intToIp(lastHostInt),
    usableHosts,
    totalAddresses,
  }
}

export function calculateFromInput(input: string): IpCalculationResult | null {
  const parsed = parseInput(input)
  if (!parsed) return null
  return calculateIpNetwork(parsed.ip, parsed.cidr)
}

export const COMMON_CIDRS = [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 16, 8] as const

export const DEFAULT_INPUT = '95.139.44.1/24'
