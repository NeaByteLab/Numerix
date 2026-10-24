/**
 * Compute the partition indices of values.
 * @description Reports positions split around the given rank.
 * @param values - Values whose partition order is computed
 * @param rank - Position of the partition boundary
 * @returns Partition indices matching the rank
 */
export default function argpartition(values: number[], rank: number): number[] {
  const length = values.length
  const indices = new Array<number>(length)
  for (let index = 0; index < length; index++) {
    indices[index] = index
  }
  const target = rank < 0 ? length + rank : rank
  if (target < 0 || target >= length) {
    return indices
  }
  let left = 0
  let right = length - 1
  while (left < right) {
    const middle = (left + right) >> 1
    const pivot = indices[middle] ?? 0
    const pivotValue = values[pivot] ?? 0
    indices[middle] = indices[right] ?? 0
    indices[right] = pivot
    let store = left
    for (let index = left; index < right; index++) {
      const current = indices[index] ?? 0
      const value = values[current] ?? 0
      if (value < pivotValue || (value === pivotValue && current < pivot)) {
        indices[index] = indices[store] ?? 0
        indices[store] = current
        store++
      }
    }
    indices[right] = indices[store] ?? 0
    indices[store] = pivot
    if (store === target) {
      break
    }
    if (store < target) {
      left = store + 1
    } else {
      right = store - 1
    }
  }
  return indices
}
