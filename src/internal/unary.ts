import mapper from '@app/internal/mapper.ts'

/**
 * Apply a scalar function to numbers.
 * @description Maps a function over scalars, vectors, and matrices.
 * @template R - Result element type
 * @param value - Scalar, vector, or matrix input
 * @param apply - Scalar function applied to each element
 * @returns Result with the same nesting shape as the input
 */
export default function unary<R>(
  value: number | number[] | number[][],
  apply: (scalar: number) => R
): R | R[] | R[][] {
  return mapper<number, R>(value, (entry) => apply(Number(entry)))
}
