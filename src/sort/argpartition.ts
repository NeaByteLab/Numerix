import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Compute partition indices of a matrix.
 * @description Reports flattened positions split around the given rank.
 * @param values - Matrix whose partition order is computed
 * @param order - Position or positions of the partition boundary
 * @param level - Null axis indicating a flattened partition
 * @returns Partition indices of the flattened matrix
 */
export default function argpartition(
  values: (number | Types.NumerixComplex)[][],
  order: number | number[],
  level: null
): number[]
/**
 * Compute partition indices of a matrix.
 * @description Reports positions split around the given rank.
 * @param values - Matrix whose partition order is computed
 * @param order - Position or positions of the partition boundary
 * @param level - Axis along which to partition a matrix
 * @returns Partition indices matching the matrix shape
 */
export default function argpartition(
  values: (number | Types.NumerixComplex)[][],
  order: number | number[],
  level?: number
): number[][]
/**
 * Compute partition indices of a vector.
 * @description Reports positions split around the given rank.
 * @param values - Vector whose partition order is computed
 * @param order - Position or positions of the partition boundary
 * @param level - Axis along which to partition a vector
 * @returns Partition indices matching the vector shape
 */
export default function argpartition(
  values: (number | Types.NumerixComplex)[],
  order: number | number[],
  level?: number | null
): number[]
/**
 * Compute the partition indices of values.
 * @description Reports positions split around the given rank.
 * @param values - Values whose partition order is computed
 * @param order - Position or positions of the partition boundary
 * @param level - Axis along which to partition a matrix
 * @returns Partition indices matching the rank
 */
export default function argpartition(
  values: (number | Types.NumerixComplex)[] | (number | Types.NumerixComplex)[][],
  order: number | number[],
  level: number | null = -1
): number[] | number[][] {
  const vector = !Array.isArray(values[0])
  if (!vector && level === null) {
    return argpartition(Shape.flatten(values) as number[], order, 0) as number[]
  }
  if (vector && level !== null && level !== 0 && level !== -1) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  const plane = vector || level === null ? 1 : level < 0 ? 2 + level : level
  if (plane !== 0 && plane !== 1) {
    throw new RangeError('axis is out of bounds for array of dimension 2')
  }
  if (!vector) {
    if (plane === 1) {
      return (values as (number | Types.NumerixComplex)[][]).map((slice) =>
        argpartition(slice ?? [], order, 0)
      )
    }
    const height = values.length
    const width = (values[0] as unknown[] | undefined)?.length ?? 0
    if (width === 0) {
      return values.map(() => [])
    }
    const result = Array.from({ length: height }, () => new Array<number>(width))
    const buffer = new Array<number | Types.NumerixComplex>(height)
    for (let column = 0; column < width; column++) {
      const partitioned = argpartition(
        Internal.column(
          values as (number | Types.NumerixComplex)[][],
          height,
          column,
          buffer,
          0
        ),
        order,
        0
      )
      for (let outer = 0; outer < height; outer++) {
        result[outer]![column] = partitioned[outer] ?? 0
      }
    }
    return result
  }
  const length = values.length
  if (length === 0) {
    return []
  }
  const indices = Array.from({ length }, (_outer, index) => index)
  const points = (Array.isArray(order) ? order : [order])
    .map((entry = 0) => {
      const locus = entry < 0 ? length + entry : entry
      if (locus < 0 || locus >= length) {
        throw new RangeError('kth out of bounds')
      }
      return locus
    })
    .sort((alpha, omega) => alpha - omega)
  const complex = Internal.classify(values, true, true) === true
  const numbers = values as number[]
  let bound = 0
  for (let cursor = 0; cursor < points.length; cursor++) {
    const place = points[cursor] ?? 0
    if (place < bound) {
      continue
    }
    let lower = bound
    let upper = length - 1
    while (lower < upper) {
      const middle = (lower + upper) >> 1
      const pivot = indices[middle] ?? 0
      indices[middle] = indices[upper] ?? 0
      indices[upper] = pivot
      let store = lower
      if (!complex) {
        const first = numbers[pivot] ?? 0
        const missing = Number.isNaN(first)
        for (let index = lower; index < upper; index++) {
          const entry = indices[index] ?? 0
          const reals = numbers[entry] ?? 0
          const front = Number.isNaN(reals)
          const delta = front !== missing
            ? (front ? 1 : -1)
            : front
            ? 0
            : reals < first
            ? -1
            : reals > first
            ? 1
            : 0
          if (delta < 0 || (delta === 0 && entry < pivot)) {
            indices[index] = indices[store] ?? 0
            indices[store] = entry
            store++
          }
        }
      } else {
        const chosen = (values as (number | Types.NumerixComplex)[])[pivot]
        const first = Internal.shape(chosen) ? chosen.re : Number(chosen ?? 0)
        const right = Internal.shape(chosen) ? chosen.im : 0
        const missing = Number.isNaN(first) || Number.isNaN(right)
        for (let index = lower; index < upper; index++) {
          const entry = indices[index] ?? 0
          const current = (values as (number | Types.NumerixComplex)[])[entry]
          const reals = Internal.shape(current) ? current.re : Number(current ?? 0)
          const imags = Internal.shape(current) ? current.im : 0
          const front = Number.isNaN(reals) || Number.isNaN(imags)
          const delta = front !== missing ? (front ? 1 : -1) : (
            Number.isNaN(reals) && Number.isNaN(first)
              ? 0
              : Number.isNaN(reals)
              ? 1
              : Number.isNaN(first)
              ? -1
              : reals < first
              ? -1
              : reals > first
              ? 1
              : 0
          ) || (
            Number.isNaN(imags) && Number.isNaN(right)
              ? 0
              : Number.isNaN(imags)
              ? 1
              : Number.isNaN(right)
              ? -1
              : imags < right
              ? -1
              : imags > right
              ? 1
              : 0
          )
          if (delta < 0 || (delta === 0 && entry < pivot)) {
            indices[index] = indices[store] ?? 0
            indices[store] = entry
            store++
          }
        }
      }
      indices[upper] = indices[store] ?? 0
      indices[store] = pivot
      if (store === place) {
        break
      }
      if (store < place) {
        lower = store + 1
      } else {
        upper = store - 1
      }
    }
    bound = place + 1
  }
  return indices
}
