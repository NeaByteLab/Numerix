/**
 * Remove entries from an array.
 * @description Drops the entries at the given positions.
 * @param input - Array entries are removed from
 * @param indices - Position or positions to remove
 * @returns Array without the removed entries
 * @template T - Type of the array values
 */
export default function remove<T>(input: T[], indices: number | number[]): T[] {
  const length = input.length
  if (typeof indices === 'number') {
    const target = indices < 0 ? length + indices : indices
    if (target < 0 || target >= length) {
      return input.slice()
    }
    const result = new Array<T>(length - 1)
    for (let index = 0; index < target; index++) {
      result[index] = input[index] as T
    }
    for (let index = target + 1; index < length; index++) {
      result[index - 1] = input[index] as T
    }
    return result
  }
  const removed = new Set<number>()
  for (let index = 0; index < indices.length; index++) {
    const raw = indices[index] ?? 0
    const normalized = raw < 0 ? length + raw : raw
    if (normalized >= 0 && normalized < length) {
      removed.add(normalized)
    }
  }
  const result = new Array<T>(length - removed.size)
  let position = 0
  for (let index = 0; index < length; index++) {
    if (!removed.has(index)) {
      result[position++] = input[index] as T
    }
  }
  return result
}
