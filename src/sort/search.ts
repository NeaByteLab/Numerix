/**
 * Find a target insertion point.
 * @description Searches a sorted vector for the target position.
 * @param values - Sorted vector to search
 * @param target - Value whose position is sought
 * @param left - When true reports the left matching position
 * @returns Insertion point of the target
 */
function findTarget(values: number[], target: number, left: boolean): number {
  let low = 0
  let high = values.length
  while (low < high) {
    const index = (low + high) >> 1
    const middle = values[index] ?? 0
    if (left ? middle < target : middle <= target) {
      low = index + 1
    } else {
      high = index
    }
  }
  return low
}

/**
 * Search sorted values for targets.
 * @description Finds the insertion point of each target.
 * @param values - Sorted values to search
 * @param targets - Target values or positions to locate
 * @param side - Side of a matching entry that is reported
 * @returns Insertion points for the given targets
 */
export default function search(
  values: number[],
  targets: number | number[],
  side: 'left' | 'right' = 'left'
): number | number[] {
  const left = side === 'left'
  if (!Array.isArray(targets)) {
    return findTarget(values, targets, left)
  }
  const length = targets.length
  const result = new Array<number>(length)
  for (let index = 0; index < length; index++) {
    result[index] = findTarget(values, targets[index] ?? 0, left)
  }
  return result
}
