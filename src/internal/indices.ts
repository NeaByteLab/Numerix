/** Radix digit width threshold for the input size */
const threshold = 10000

/**
 * Sort numeric values with their positions.
 * @description Uses a radix sort over monotonic IEEE754 keys.
 * @param values - Values whose positions are sorted
 * @returns Positions ordered by ascending value with NaN entries moved to the end
 */
export default function indices(values: number[]): number[] {
  const length = values.length
  if (length < 2) {
    const indices = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      indices[index] = index
    }
    return indices
  }
  const absent: number[] = []
  const positions = new Uint32Array(length)
  let total = 0
  for (let index = 0; index < length; index++) {
    const value = values[index] ?? 0
    if (Number.isNaN(value)) {
      absent.push(index)
    } else {
      positions[total++] = index
    }
  }
  const result = new Array<number>(length)
  if (total > 0) {
    const wide = total >= threshold
    const bits = wide ? 16 : 8
    const mask = wide ? 0xFFFF : 0xFF
    const buckets = wide ? 65536 : 256
    const passes = 64 / bits
    const high = new Uint32Array(total)
    const low = new Uint32Array(total)
    const buffer = new ArrayBuffer(8)
    const reals = new Float64Array(buffer)
    const words = new Uint32Array(buffer)
    for (let index = 0; index < total; index++) {
      const value = values[positions[index] ?? 0] ?? 0
      reals[0] = value === 0 ? 0 : value
      const upper = words[1] ?? 0
      const lower = words[0] ?? 0
      if ((upper >>> 31) === 1) {
        high[index] = (~upper) >>> 0
        low[index] = (~lower) >>> 0
      } else {
        high[index] = (upper | 0x80000000) >>> 0
        low[index] = lower
      }
    }
    const counts = new Uint32Array(buckets)
    let source = new Uint32Array(total)
    for (let index = 0; index < total; index++) {
      source[index] = index
    }
    let destination = new Uint32Array(total)
    for (let pass = 0; pass < passes; pass++) {
      const origin = pass * bits
      const keys = origin < 32 ? low : high
      const shift = origin % 32
      counts.fill(0)
      for (let index = 0; index < total; index++) {
        const bucket = (keys[source[index] ?? 0] ?? 0) >>> shift & mask
        counts[bucket] = (counts[bucket] ?? 0) + 1
      }
      let offset = 0
      for (let index = 0; index < buckets; index++) {
        const tally = counts[index] ?? 0
        counts[index] = offset
        offset += tally
      }
      for (let index = 0; index < total; index++) {
        const element = source[index] ?? 0
        const bucket = (keys[element] ?? 0) >>> shift & mask
        const slot = counts[bucket] ?? 0
        counts[bucket] = slot + 1
        destination[slot] = element
      }
      const swap = source
      source = destination
      destination = swap
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
