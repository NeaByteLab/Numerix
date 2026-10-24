import type * as Types from '@app/types.ts'
import gamma from '@app/random/gamma.ts'

/**
 * Draw samples from a Dirichlet distribution.
 * @description Produces probability vectors from given concentration values.
 * @param alpha - Concentration parameter for each component
 * @param size - Number of samples to draw when given
 * @param generator - Generator supplying uniform samples
 * @returns Single sample vector or array of sample vectors
 */
export default function dirichlet(
  alpha: number[],
  size?: number,
  generator?: Types.NumerixGenerator
): number[] | number[][] {
  const dimension = alpha.length
  if (size === undefined) {
    return sampleDirichlet(alpha, dimension, generator)
  }
  const result = new Array<number[]>(size)
  for (let index = 0; index < size; index++) {
    result[index] = sampleDirichlet(alpha, dimension, generator)
  }
  return result
}

/**
 * Draw one Dirichlet variate.
 * @description Produces a single probability vector.
 * @param alpha - Concentration parameter for each component
 * @param dimension - Number of components in the result
 * @param generator - Generator supplying uniform samples
 * @returns Single Dirichlet variate
 */
function sampleDirichlet(
  alpha: number[],
  dimension: number,
  generator?: Types.NumerixGenerator
): number[] {
  const values = new Array<number>(dimension)
  let total = 0
  for (let index = 0; index < dimension; index++) {
    const value = Number(gamma(alpha[index] ?? 1, 1, undefined, generator))
    values[index] = value
    total += value
  }
  const inverse = 1 / (total || 1)
  for (let index = 0; index < dimension; index++) {
    values[index] = (values[index] ?? 0) * inverse
  }
  return values
}
