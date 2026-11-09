import type * as Types from '@app/types.ts'
import * as Linalg from '@app/linalg/index.ts'
import * as Maths from '@app/math/index.ts'
import vander from '@app/poly/vander.ts'

/**
 * Sample a polynomial or function.
 * @description Evaluates a polynomial or callback over sample points.
 * @param count - Number of sample points to generate
 * @param degree - Degree used when sampling a polynomial
 * @param callback - Callback evaluated when sampling a function
 * @param family - Sample point distribution to use
 * @returns Sampled values for the generated points
 */
export default function sample(
  count: number | ((point: number) => number),
  degree?: number | 'first' | 'second',
  callback?: ((point: number) => number) | 'first' | 'second',
  family?: 'first' | 'second'
): number[]
/**
 * Interpolate a complex function.
 * @description Evaluates a complex callback at Chebyshev points.
 * @param count - Complex callback or number of sample points
 * @param degree - Degree of the interpolating Chebyshev polynomial
 * @param callback - Complex callback or point family
 * @param family - Sample point distribution to use
 * @returns Complex Chebyshev coefficients
 */
export default function sample(
  count: number | ((point: number) => number | Types.NumerixComplex),
  degree?: number | 'first' | 'second',
  callback?: ((point: number) => number | Types.NumerixComplex) | 'first' | 'second',
  family?: 'first' | 'second'
): number[] | Types.NumerixComplex[]
/**
 * Sample a polynomial or function.
 * @description Evaluates a polynomial or callback over sample points.
 * @param count - Number of sample points to generate
 * @param degree - Degree used when sampling a polynomial
 * @param callback - Callback evaluated when sampling a function
 * @param family - Sample point distribution to use
 * @returns Sampled values for the generated points
 */
export default function sample(
  count: number | ((point: number) => number | Types.NumerixComplex),
  degree?: number | 'first' | 'second',
  callback?: ((point: number) => number | Types.NumerixComplex) | 'first' | 'second',
  family: 'first' | 'second' = 'first'
): number[] | Types.NumerixComplex[] {
  if (
    (typeof degree === 'string' && degree !== 'first' && degree !== 'second') ||
    (typeof callback === 'string' && callback !== 'first' && callback !== 'second') ||
    (family !== 'first' && family !== 'second')
  ) {
    throw new RangeError("kind must be 'first' or 'second'")
  }
  const layout = degree === 'first' || degree === 'second'
    ? degree
    : callback === 'first' || callback === 'second'
    ? callback
    : family
  const functor = typeof count === 'function'
    ? count
    : typeof callback === 'function'
    ? callback
    : undefined
  const power = typeof degree === 'number' ? degree : undefined
  const points = power === undefined ? (typeof count === 'number' ? count : 1) : power + 1
  if (!Number.isInteger(points) || points < 1 || (layout === 'second' && points < 2)) {
    throw new RangeError('Point count is out of range')
  }
  const stride = layout === 'second' ? Math.PI / (points - 1) : 0.5 * (Math.PI / points)
  const samples = Array.from(
    { length: points },
    (_outer, index) =>
      layout === 'second'
        ? Math.cos(Math.PI - stride * index)
        : Math.sin(stride * (2 * index - points + 1))
  )
  if (!functor || power === undefined) {
    return samples
  }
  const result = Linalg.matmul(
    samples.map((point, index) =>
      Maths.mul(
        functor(point),
        layout === 'second' && (index === 0 || index === points - 1) ? 0.5 : 1
      )
    ) as (number | Types.NumerixComplex)[],
    vander(samples, power, 'cheb')
  ) as (number | Types.NumerixComplex)[]
  for (let order = 0; order < result.length; order++) {
    const entry = result[order]!
    const divisor = layout === 'second'
      ? (order === 0 || order === points - 1 ? points - 1 : 0.5 * (points - 1))
      : (order === 0 ? points : 0.5 * points)
    if (typeof entry === 'number') {
      result[order] = entry / divisor
    } else {
      entry.re = entry.re / divisor || 0
      entry.im = entry.im / divisor || 0
    }
  }
  return result as number[] | Types.NumerixComplex[]
}
