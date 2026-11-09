import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import gamma from '@app/random/gamma.ts'

/**
 * Draw samples from a beta distribution.
 * @description Produces variates with the given shape parameters.
 * @param first - First shape parameter of the distribution
 * @param right - Second shape parameter of the distribution
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample or array of samples
 */
export default function beta(
  first: number,
  right: number,
  count?: number,
  generator?: Types.NumerixGenerator
): number | number[] {
  if (first <= 0 || right <= 0) {
    throw new RangeError('beta shape parameters must be positive')
  }
  return Internal.draw(count, () => {
    if (first <= 1 && right <= 1) {
      while (true) {
        const uniform = Internal.source(generator)
        const companion = Internal.source(generator)
        const alpha = Math.pow(uniform, 1 / first)
        const total = alpha + Math.pow(companion, 1 / right)
        if (total <= 1) {
          if (total > 0) {
            return alpha / total
          }
          const lower = Math.log(uniform) / first
          const upper = Math.log(companion) / right
          const crest = Math.max(lower, upper)
          const offset = lower - crest
          return Math.exp(offset - Math.log(Math.exp(offset) + Math.exp(upper - crest)))
        }
      }
    }
    const prior = Number(gamma(first, 1, undefined, generator))
    return prior / (prior + Number(gamma(right, 1, undefined, generator)))
  })
}
