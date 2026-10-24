import type * as Types from '@app/types.ts'

/**
 * Count leaf values in an array.
 * @description Walks the array and tallies every scalar entry.
 * @param source - Nested array to inspect
 * @returns Number of leaf values found
 */
function countLeaves(source: unknown[]): number {
  let total = 0
  for (let index = 0; index < source.length; index++) {
    const entry = source[index]
    if (Array.isArray(entry)) {
      total += countLeaves(entry)
    } else {
      total++
    }
  }
  return total
}

/**
 * Copy leaf values into an array.
 * @description Walks the source and writes each leaf in order.
 * @param source - Nested array to read from
 * @param target - Flat array receiving the leaf values
 * @param state - Tracks the next write position
 * @template T - Type of the flattened values
 */
function fillFlat<T>(source: unknown[], target: T[], state: Types.NumerixPosition): void {
  for (let index = 0; index < source.length; index++) {
    const entry = source[index]
    if (Array.isArray(entry)) {
      fillFlat(entry, target, state)
    } else {
      target[state.position++] = entry as T
    }
  }
}

/**
 * Flatten nested arrays into one dimension.
 * @description Collects every leaf value into a single array.
 * @param input - Nested array to flatten
 * @returns Flat array of all leaf values
 * @template T - Type of the flattened values
 */
export default function flatten<T = number>(input: unknown[]): T[] {
  if (!Array.isArray(input[0])) {
    return input.slice() as T[]
  }
  const result = new Array<T>(countLeaves(input))
  fillFlat(input, result, { position: 0 })
  return result
}
