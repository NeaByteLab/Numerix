import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a Poisson distribution.
 * @description Produces counts of events in an interval.
 * @param intensity - Expected number of events per interval
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function poisson(
  intensity: number = 1,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (intensity < 0 || Number.isNaN(intensity)) {
    throw new RangeError('lam < 0')
  }
  if (!Number.isFinite(intensity) || intensity >= 9.223372036854776e18) {
    throw new RangeError('lam value too large')
  }
  return Internal.draw(count, () => {
    if (intensity === 0) {
      return 0
    }
    if (intensity >= 1e5) {
      return Math.max(0, Math.round(intensity + Math.sqrt(intensity) * Internal.deviate(generator)))
    }
    let remaining = intensity
    let total = 0
    while (remaining > 0) {
      const threshold = Math.exp(-(remaining > 500 ? 500 : remaining))
      let chance = 1
      do {
        total++
        chance *= Internal.source(generator)
      } while (chance > threshold)
      total--
      remaining -= 500
    }
    return total
  })
}
