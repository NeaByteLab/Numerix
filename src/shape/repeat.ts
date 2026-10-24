import flatten from '@app/shape/flatten.ts'

/**
 * Repeat array entries.
 * @description Repeats the whole array or each entry separately.
 * @param input - Array whose entries are repeated
 * @param repeats - Repetition count per entry or for the array
 * @param tile - When true repeats the whole array instead
 * @returns Array containing the repeated entries
 */
export default function repeat(
  input: unknown[],
  repeats: number | number[],
  tile = false
): unknown[] {
  const flattened = Array.isArray(input[0]) ? flatten<unknown>(input) : input
  const length = flattened.length
  if (tile) {
    const count = typeof repeats === 'number' ? repeats : repeats[0] ?? 1
    const total = count * length
    const result = new Array<unknown>(total)
    for (let index = 0; index < total; index++) {
      result[index] = flattened[index % length]
    }
    return result
  }
  if (typeof repeats === 'number') {
    const result = new Array<unknown>(length * repeats)
    let position = 0
    for (let index = 0; index < length; index++) {
      const value = flattened[index]
      for (let repeat = 0; repeat < repeats; repeat++) {
        result[position++] = value
      }
    }
    return result
  }
  let total = 0
  for (let index = 0; index < length; index++) {
    total += repeats[index] ?? 0
  }
  const result = new Array<unknown>(total)
  let position = 0
  for (let index = 0; index < length; index++) {
    const value = flattened[index]
    const count = repeats[index] ?? 0
    for (let repeat = 0; repeat < count; repeat++) {
      result[position++] = value
    }
  }
  return result
}
