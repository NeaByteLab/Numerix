import bits from '@app/internal/bits.ts'

/**
 * Sort numeric values with their positions.
 * @description Uses a radix sort over monotonic IEEE754 keys.
 * @param values - Values whose positions are sorted
 * @returns Positions ordered by ascending value with NaN entries moved to the end
 */
export default function indices(values: number[]): number[] {
  const length = values.length
  if (length < 2) {
    return Array.from({ length }, (_outer, index) => index)
  }
  const absent: number[] = []
  const positions = new Uint32Array(length)
  let total = 0
  for (let index = 0; index < length; index++) {
    if (Number.isNaN(values[index] ?? 0)) {
      absent.push(index)
    } else {
      positions[total++] = index
    }
  }
  const result = new Array<number>(length)
  if (total > 0) {
    const wider = total >= 10000
    const width = wider ? 16 : 8
    const filter = wider ? 0xFFFF : 0xFF
    const buckets = wider ? 65536 : 256
    const uppers = new Uint32Array(total)
    const lowers = new Uint32Array(total)
    for (let index = 0; index < total; index++) {
      bits.float[0] = (values[positions[index] ?? 0] ?? 0) || 0
      const words = bits.uint[0] ?? 0n
      const upper = Number(words >> 32n) >>> 0
      const lower = Number(words & 0xFFFFFFFFn) >>> 0
      if ((upper >>> 31) === 1) {
        uppers[index] = (~upper) >>> 0
        lowers[index] = (~lower) >>> 0
      } else {
        uppers[index] = (upper | 0x80000000) >>> 0
        lowers[index] = lower
      }
    }
    const counts = new Uint32Array(buckets)
    let source = new Uint32Array(total)
    for (let index = 0; index < total; index++) {
      source[index] = index
    }
    let destination = new Uint32Array(total)
    for (let round = 0; round < 64 / width; round++) {
      const origin = round * width
      const digits = origin < 32 ? lowers : uppers
      const shift = origin % 32
      counts.fill(0)
      for (let index = 0; index < total; index++) {
        const bucket = (digits[source[index] ?? 0] ?? 0) >>> shift & filter
        counts[bucket] = (counts[bucket] ?? 0) + 1
      }
      let offset = 0
      for (let index = 0; index < buckets; index++) {
        ;[counts[index], offset] = [offset, offset + (counts[index] ?? 0)]
      }
      for (let index = 0; index < total; index++) {
        const element = source[index] ?? 0
        const bucket = (digits[element] ?? 0) >>> shift & filter
        const place = counts[bucket] ?? 0
        counts[bucket] = place + 1
        destination[place] = element
      }
      ;[source, destination] = [destination, source]
    }
    for (let index = 0; index < total; index++) {
      result[index] = positions[source[index] ?? 0] ?? 0
    }
  }
  for (let index = 0; index < absent.length; index++) {
    result[total + index] = absent[index] ?? 0
  }
  return result
}
