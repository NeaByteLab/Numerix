/**
 * Partition values around a rank.
 * @description Places the value at rank in sorted position.
 * @param values - Values to partition
 * @param rank - Position of the partition boundary
 * @returns Partitioned values matching the rank
 */
export default function partition(values: number[], rank: number): number[] {
  const result = values.slice()
  const length = result.length
  const target = rank < 0 ? length + rank : rank
  if (target < 0 || target >= length) {
    return result
  }
  let left = 0
  let right = length - 1
  while (left < right) {
    const middle = (left + right) >> 1
    const pivot = result[middle] ?? 0
    result[middle] = result[right] ?? 0
    result[right] = pivot
    let store = left
    for (let index = left; index < right; index++) {
      const current = result[index] ?? 0
      if (current < pivot) {
        result[index] = result[store] ?? 0
        result[store] = current
        store++
      }
    }
    result[right] = result[store] ?? 0
    result[store] = pivot
    if (store === target) {
      break
    }
    if (store < target) {
      left = store + 1
    } else {
      right = store - 1
    }
  }
  return result
}
