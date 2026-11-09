import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import gamma from '@app/random/gamma.ts'

/**
 * Draw samples from a Dirichlet distribution.
 * @description Produces probability vectors from given concentration values.
 * @param alpha - Concentration parameter for each component
 * @param count - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample vector or array of sample vectors
 */
export default function dirichlet(
  alpha: number[],
  count?: number | Types.NumerixGenerator,
  generator?: Types.NumerixGenerator
): number[] | number[][] {
  if (alpha.length === 0) {
    throw new RangeError('alpha must not be empty')
  }
  for (let index = 0; index < alpha.length; index++) {
    if ((alpha[index] ?? 0) <= 0) {
      throw new RangeError('alpha <= 0')
    }
  }
  const source = typeof count === 'object' ? count : generator
  return Internal.draw(typeof count === 'number' ? count : undefined, () => {
    let total = 0
    const values = new Array<number>(alpha.length)
    for (let index = 0; index < alpha.length; index++) {
      const value = Number(gamma(alpha[index] ?? 1, 1, undefined, source))
      values[index] = value
      total += value
    }
    if (Number.isNaN(total)) {
      return values.fill(NaN)
    }
    if (total === 0) {
      let crest = -Infinity
      for (let index = 0; index < alpha.length; index++) {
        const shape = alpha[index] ?? 1
        const entry = Math.log(Number(gamma(shape + 1, 1, undefined, source))) +
          Math.log(Internal.source(source)) / shape
        values[index] = entry
        if (entry > crest) {
          crest = entry
        }
      }
      for (let index = 0; index < values.length; index++) {
        const weight = Math.exp((values[index] ?? 0) - crest)
        values[index] = weight
        total += weight
      }
    }
    for (let index = 0; index < values.length; index++) {
      values[index] = (values[index] ?? 0) / (total || 1)
    }
    return values
  })
}
