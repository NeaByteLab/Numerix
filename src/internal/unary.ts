/**
 * Apply a scalar function to numbers.
 * @description Maps a function over scalars, vectors, and matrices.
 * @param value - Scalar, vector, or matrix input
 * @param apply - Scalar function applied to each element
 * @returns Result with the same nesting shape as the input
 * @template R - Result element type
 */
export default function unary<R>(
  value: number | number[] | number[][],
  apply: (scalar: number) => R
): R | R[] | R[][] {
  if (!Array.isArray(value)) {
    return apply(Number(value))
  }
  const length = value.length
  const result = new Array<R>(length)
  for (let index = 0; index < length; index++) {
    const element = value[index]
    if (typeof element === 'number') {
      result[index] = apply(element)
    } else {
      result[index] = unary(element as never, apply) as R
    }
  }
  return result as R[] | R[][]
}
