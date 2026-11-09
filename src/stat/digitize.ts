import * as Internal from '@app/internal/index.ts'

/**
 * Assign a scalar value to a bin index.
 * @description Reports the bin into which the value falls.
 * @param values - Scalar value assigned to a bin index
 * @param edges - Bin boundary positions
 * @param closed - When true, treats bins as right-closed
 * @returns Bin index for the value
 */
export default function digitize(
  values: number,
  edges: number[],
  closed?: boolean
): number
/**
 * Assign vector values to bin indices.
 * @description Reports the bin into which each value falls.
 * @param values - Vector of values assigned to bin indices
 * @param edges - Bin boundary positions
 * @param closed - When true, treats bins as right-closed
 * @returns Bin index for each value
 */
export default function digitize(
  values: number[],
  edges: number[],
  closed?: boolean
): number[]
/**
 * Assign matrix values to bin indices.
 * @description Reports the bin into which each matrix entry falls.
 * @param values - Matrix of values assigned to bin indices
 * @param edges - Bin boundary positions
 * @param closed - When true, treats bins as right-closed
 * @returns Matrix of bin indices
 */
export default function digitize(
  values: number[][],
  edges: number[],
  closed?: boolean
): number[][]
/**
 * Assign values to bin indices.
 * @description Reports the bin into which each value falls.
 * @param values - Values assigned to bin indices
 * @param edges - Bin boundary positions
 * @param closed - When true, treats bins as right-closed
 * @returns Bin index for each value
 */
export default function digitize(
  values: number | number[] | number[][],
  edges: number[],
  closed: boolean = false
): number | number[] | number[][] {
  const count = edges.length
  let rising = true
  let falling = true
  for (let index = 1; index < count; index++) {
    const prior = edges[index - 1] ?? 0
    const following = edges[index] ?? 0
    if (Number.isNaN(prior) || Number.isNaN(following)) {
      throw new RangeError('bins must be monotonically increasing or decreasing')
    }
    if (following < prior) {
      rising = false
    }
    if (following > prior) {
      falling = false
    }
  }
  if (!rising && !falling) {
    throw new RangeError('bins must be monotonically increasing or decreasing')
  }
  return Internal.mapper(values, (entry) => {
    if (count === 0) {
      return 0
    }
    const target = entry ?? 0
    if (Number.isNaN(target)) {
      return rising ? count : 0
    }
    let lower = 0
    let upper = count
    while (lower < upper) {
      const middle = (lower + upper) >> 1
      const current = edges[rising ? middle : count - 1 - middle] ?? 0
      if (closed ? current < target : current <= target) {
        lower = middle + 1
      } else {
        upper = middle
      }
    }
    return rising ? lower : count - lower
  })
}
