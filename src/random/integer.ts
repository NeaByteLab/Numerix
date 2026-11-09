import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw random integers.
 * @description Produces integers within an inclusive range.
 * @param lower - Lower bound of the generated range
 * @param upper - Upper bound of the generated range
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function integer(
  lower: number,
  upper?: number,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (!Number.isFinite(lower) || (upper !== undefined && !Number.isFinite(upper))) {
    throw new RangeError('low and high must be finite')
  }
  const start = upper === undefined ? 0 : Math.trunc(lower)
  const width = (upper === undefined ? Math.trunc(lower) : Math.trunc(upper)) - start
  if (!(width > 0)) {
    throw new RangeError('low >= high')
  }
  return Internal.draw(count, () => Math.floor(start + Internal.source(generator) * width))
}
