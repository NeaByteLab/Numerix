import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Cauchy distribution.
 * @description Produces heavy-tailed variates around the origin.
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function cauchy(
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  return Internal.draw(count, () => Math.tan(Math.PI * (Internal.source(generator) - 0.5)))
}
