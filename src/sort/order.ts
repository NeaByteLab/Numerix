import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'
import argsort from '@app/sort/argsort.ts'

/**
 * Sort values along an axis.
 * @description Sorts numbers or complex values along an axis.
 * @param values - Values to sort
 * @param reverse - When true, sorts from largest to smallest, or specifies the axis
 * @param level - Axis along which the values are sorted
 * @returns Sorted values matching the input shape
 */
export default function order(
  values:
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  reverse: boolean | number | null = false,
  level: number | null = -1
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  const descending = typeof reverse === 'boolean' ? reverse : false
  const target = typeof reverse === 'number' || reverse === null ? reverse : level
  const vector = !Array.isArray(values[0])
  if (!vector && target === null) {
    return order(Shape.flatten(values) as number[], descending, 0)
  }
  const resolved = target === null ? 1 : target < 0 ? (vector ? 1 : 2) + target : target
  if (target !== null && (resolved < 0 || resolved >= (vector ? 1 : 2))) {
    throw new RangeError(`axis is out of bounds for array of dimension ${vector ? 1 : 2}`)
  }
  if (!vector) {
    if (Internal.classify(values, true, true) !== true) {
      if (resolved === 1) {
        return (values as number[][]).map((slice) => Internal.values(slice ?? [], descending))
      }
      const height = values.length
      const width = (values[0] as number[] | undefined)?.length ?? 0
      if (width === 0) {
        return values.map(() => [])
      }
      const result = Array.from({ length: height }, () => new Array<number>(width))
      const buffer = new Array<number>(height)
      for (let column = 0; column < width; column++) {
        const sorted = Internal.values(
          Internal.column(values as number[][], height, column, buffer, 0),
          descending
        )
        for (let outer = 0; outer < height; outer++) {
          result[outer]![column] = sorted[outer] ?? 0
        }
      }
      return result
    }
    if (resolved === 1) {
      return (values as (number | Types.NumerixComplex)[][]).map((slice) =>
        (argsort(slice ?? [], descending) as number[]).map((index) => {
          const entry = slice?.[index]
          return Internal.shape(entry)
            ? { re: entry.re, im: entry.im }
            : { re: Number(entry ?? 0), im: 0 }
        })
      )
    }
    const height = values.length
    const width = (values[0] as unknown[] | undefined)?.length ?? 0
    if (width === 0) {
      return values.map(() => [])
    }
    const result = Array.from({ length: height }, () => new Array<Types.NumerixComplex>(width))
    const buffer = new Array<number | Types.NumerixComplex>(height)
    for (let column = 0; column < width; column++) {
      const indices = argsort(
        Internal.column(
          values as (number | Types.NumerixComplex)[][],
          height,
          column,
          buffer,
          0
        ),
        descending
      ) as number[]
      for (let outer = 0; outer < height; outer++) {
        const entry = buffer[indices[outer] ?? 0]
        result[outer]![column] = Internal.shape(entry)
          ? { re: entry.re, im: entry.im }
          : { re: Number(entry ?? 0), im: 0 }
      }
    }
    return result
  }
  if (Internal.classify(values, true, true) !== true) {
    return Internal.values(values as number[], descending)
  }
  return (argsort(values as Types.NumerixComplex[], descending) as number[]).map((index) => {
    const entry = (values as unknown[])[index]
    return Internal.shape(entry)
      ? { re: entry.re, im: entry.im }
      : { re: Number(entry ?? 0), im: 0 }
  })
}
