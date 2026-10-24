import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Cauchy distribution.
 * @description Produces heavy tailed variates around the origin.
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function cauchy(
  size?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (size === undefined) {
    return sampleCauchy(generator)
  }
  return Internal.draw(size, () => sampleCauchy(generator))
}

/**
 * Draw one Cauchy variate.
 * @description Produces a heavy tailed sample around the origin.
 * @param generator - Generator supplying uniform samples
 * @returns Single Cauchy variate
 */
function sampleCauchy(generator?: Types.NumerixGenerator): number {
  return Math.tan(Math.PI * (Internal.source(generator) - 0.5))
}
