import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Compute the sorting indices of values.
 * @description Reports positions that would sort the values.
 * @param values - Values whose sorting order is computed
 * @param reverse - When true, sorts from largest to smallest, or specifies the axis
 * @param textual - When true, compares values as text, or specifies the axis
 * @param level - Axis along which to sort
 * @returns Sorting indices matching the input shape
 */
export default function argsort(
  values:
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  reverse: boolean | number | null = false,
  textual: boolean | number | null = false,
  level: number | null = -1
): number[] | number[][] {
  const descending = typeof reverse === 'boolean' ? reverse : false
  if (Array.isArray(values[0]) && typeof textual === 'boolean' && textual) {
    const matrix = values as unknown[][]
    if (Internal.classify(matrix, true, true) !== true) {
      const numbers = matrix as number[][]
      return Array.from({ length: numbers[0]?.length ?? 0 }, (_unused, index) => index).sort(
        (first, second) => {
          for (let cursor = numbers.length - 1; cursor >= 0; cursor--) {
            const prior = numbers[cursor]?.[first] ?? 0
            const later = numbers[cursor]?.[second] ?? 0
            const missing = Number.isNaN(prior)
            if (missing !== Number.isNaN(later)) {
              return missing ? 1 : -1
            }
            const difference = prior < later ? -1 : prior > later ? 1 : 0
            if (difference !== 0) {
              return !missing && descending ? -difference : difference
            }
          }
          return first - second
        }
      )
    }
    return Array.from({ length: matrix[0]?.length ?? 0 }, (_unused, index) => index).sort(
      (first, second) => {
        for (let cursor = matrix.length - 1; cursor >= 0; cursor--) {
          const alpha = matrix[cursor]?.[first]
          const omega = matrix[cursor]?.[second]
          const prior = Internal.shape(alpha) ? alpha.re : Number(alpha ?? 0)
          const reals = Internal.shape(alpha) ? alpha.im : 0
          const later = Internal.shape(omega) ? omega.re : Number(omega ?? 0)
          const imags = Internal.shape(omega) ? omega.im : 0
          const missing = Number.isNaN(prior) || Number.isNaN(reals)
          if (missing !== (Number.isNaN(later) || Number.isNaN(imags))) {
            return missing ? 1 : -1
          }
          const difference = (
            prior < later
              ? -1
              : prior > later
              ? 1
              : Number.isNaN(prior) === Number.isNaN(later)
              ? 0
              : Number.isNaN(prior)
              ? 1
              : -1
          ) || (
            reals < imags
              ? -1
              : reals > imags
              ? 1
              : Number.isNaN(reals) === Number.isNaN(imags)
              ? 0
              : Number.isNaN(reals)
              ? 1
              : -1
          )
          if (difference !== 0) {
            return !missing && descending ? -difference : difference
          }
        }
        return first - second
      }
    )
  }
  const target = typeof reverse === 'number' || reverse === null
    ? reverse
    : typeof textual === 'number' || textual === null
    ? textual
    : level
  const vector = !Array.isArray(values[0])
  if (!vector && target === null) {
    return argsort(Shape.flatten(values) as number[], descending, false, 0)
  }
  if (vector && target !== null && target !== 0 && target !== -1) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  const plane = vector || target === null ? 1 : target < 0 ? 2 + target : target
  if (plane !== 0 && plane !== 1) {
    throw new RangeError('axis is out of bounds for array of dimension 2')
  }
  if (!vector) {
    const matrix = values as (number | Types.NumerixComplex)[][]
    if (plane === 1) {
      return matrix.map((slice) => argsort(slice ?? [], descending, false, 0) as number[])
    }
    const height = matrix.length
    const width = matrix[0]?.length ?? 0
    if (width === 0) {
      return matrix.map(() => [])
    }
    const result = Array.from({ length: height }, () => new Array<number>(width))
    const buffer = new Array<number | Types.NumerixComplex>(height)
    for (let column = 0; column < width; column++) {
      const sorted = argsort(
        Internal.column(matrix, height, column, buffer),
        descending,
        false,
        0
      ) as number[]
      for (let outer = 0; outer < height; outer++) {
        result[outer]![column] = sorted[outer] ?? 0
      }
    }
    return result
  }
  if (Internal.classify(values, true, true) === true) {
    return argsort([values] as Types.NumerixComplex[][], descending, true) as number[]
  }
  if (!descending) {
    return Internal.indices(values as number[])
  }
  return Internal.indices(
    (values as number[]).map((entry) => {
      const value = Number(entry ?? 0)
      return value === 0 ? (Object.is(value, -0) ? 0 : -0) : -value
    })
  )
}
