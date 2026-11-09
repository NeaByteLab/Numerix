import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Find insertion indices in a sorted array.
 * @description Locates positions where targets should be inserted to maintain order.
 * @param values - Sorted sequence of values
 * @param targets - Values to locate in the sorted sequence
 * @param where - Side of equal values where targets are inserted
 * @param sorter - Optional permutation indices that sort values
 * @returns Insertion index or indices matching the target shape
 */
export default function search(
  values: (number | Types.NumerixComplex)[],
  targets:
    | number
    | Types.NumerixComplex
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  where: 'left' | 'right' = 'left',
  sorter?: number[]
): number | number[] | number[][] {
  if (where !== 'left' && where !== 'right') {
    throw new RangeError("search side must be 'left' or 'right'")
  }
  let indices: number[] | undefined
  if (sorter !== undefined) {
    if (sorter.length !== values.length) {
      throw new RangeError('object of too small depth for desired array')
    }
    indices = new Array<number>(sorter.length)
    for (let index = 0; index < sorter.length; index++) {
      const entry = sorter[index] ?? 0
      const place = entry < 0 ? values.length + entry : entry
      if (!Number.isInteger(entry) || place < 0 || place >= values.length) {
        throw new RangeError('Sorter index out of range.')
      }
      indices[index] = place
    }
  }
  if (
    Internal.classify(values, true, true) !== true &&
    Internal.classify(targets, true, true) !== true
  ) {
    const numbers = values as number[]
    return Internal.mapper(targets, (entry) => {
      let lower = 0
      let upper = numbers.length
      const first = Number(entry ?? 0)
      const missing = Number.isNaN(first)
      while (lower < upper) {
        const index = (lower + upper) >> 1
        const reals = numbers[indices ? indices[index]! : index] ?? 0
        const absent = Number.isNaN(reals)
        const delta = absent !== missing
          ? (absent ? 1 : -1)
          : absent
          ? 0
          : reals < first
          ? -1
          : reals > first
          ? 1
          : 0
        if (where === 'left' ? delta < 0 : delta <= 0) {
          lower = index + 1
        } else {
          upper = index
        }
      }
      return lower
    }) as number | number[] | number[][]
  }
  return Internal.mapper(targets, (entry) => {
    let lower = 0
    let upper = values.length
    const first = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
    const right = Internal.shape(entry) ? entry.im : 0
    const missing = Number.isNaN(first) || Number.isNaN(right)
    while (lower < upper) {
      const index = (lower + upper) >> 1
      const current = values[indices ? indices[index]! : index]
      const reals = Internal.shape(current) ? current.re : Number(current ?? 0)
      const imags = Internal.shape(current) ? current.im : 0
      const absent = Number.isNaN(reals) || Number.isNaN(imags)
      const delta = absent !== missing ? (absent ? 1 : -1) : (
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
      if (where === 'left' ? delta < 0 : delta <= 0) {
        lower = index + 1
      } else {
        upper = index
      }
    }
    return lower
  }) as number | number[] | number[][]
}
