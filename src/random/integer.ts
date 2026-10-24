import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw random integers.
 * @description Produces integers within an inclusive range.
 * @param low - Lower bound of the generated range
 * @param high - Upper bound of the generated range
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function integer(
  low: number,
  high?: number,
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  const start = high === undefined ? 0 : Math.ceil(low)
  const end = high === undefined ? Math.floor(low) : Math.floor(high)
  const span = end - start
  if (size === undefined) {
    return sampleInteger(start, span, generator)
  }
  return Internal.draw(size, () => sampleInteger(start, span, generator))
}

/**
 * Draw one integer.
 * @description Produces a single integer within the inclusive range.
 * @param start - Lower bound of the generated range
 * @param span - Width of the generated range
 * @param generator - Generator supplying uniform samples
 * @returns Single integer
 */
function sampleInteger(
  start: number,
  span: number,
  generator?: Types.NumerixGenerator
): number {
  return Math.floor(start + Internal.source(generator) * span)
}
