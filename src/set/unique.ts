import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'
import * as Sort from '@app/sort/index.ts'

/**
 * Extract distinct values from an array.
 * @description Collects sorted values without duplicates.
 * @param first - Values to deduplicate
 * @param counted - When true, returns counts and index details
 * @param level - Optional axis to deduplicate along for two-dimensional matrices
 * @param equal - When true, collapses NaN values into a single entry
 * @returns Distinct values or details about each distinct value
 */
export default function unique(
  first: unknown[],
  counted: boolean = false,
  level?: number | null,
  equal: boolean = true
):
  | number[]
  | number[][]
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][]
  | Types.NumerixUnique {
  const matrix = level !== undefined && level !== null && Array.isArray(first[0])
  const resolved = level !== undefined && level !== null
    ? (level < 0 ? (matrix ? 2 : 1) + level : level)
    : 0
  if (level !== undefined && level !== null && (resolved < 0 || resolved >= (matrix ? 2 : 1))) {
    throw new RangeError('axis out of bounds')
  }
  const items = !Array.isArray(first[0])
    ? first
    : !matrix
    ? Shape.flatten(first)
    : (resolved === 0 ? first : Shape.transpose(first as number[][]))
  if (
    !matrix &&
    !counted &&
    equal &&
    items.every((entry): entry is number => typeof entry === 'number')
  ) {
    return Internal.distinct(items)
  }
  const complex = Internal.classify(first, true, true) === true
  const values = !complex
    ? (matrix
      ? (items as number[][]).map((slice) =>
        slice.map((entry) => {
          const value = Number(entry ?? 0)
          return value === 0 ? 0 : value
        })
      )
      : (items as number[]).map((entry) => {
        const value = Number(entry ?? 0)
        return value === 0 ? 0 : value
      }))
    : (Internal.nested(items, (entry) => {
      const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
      const imags = Internal.shape(entry) ? entry.im : 0
      return {
        re: reals === 0 ? 0 : reals,
        im: imags === 0 ? 0 : imags
      }
    }) as (Types.NumerixComplex | Types.NumerixComplex[])[])
  const order = matrix
    ? Array.from({ length: values.length }, (_unused, index) => index).sort((alpha, omega) => {
      const prior = values[alpha] as (number | Types.NumerixComplex)[]
      const later = values[omega] as (number | Types.NumerixComplex)[]
      for (let cursor = 0; cursor < prior.length; cursor++) {
        if (!complex) {
          const first = prior[cursor] as number
          const right = later[cursor] as number
          const missing = Number.isNaN(first)
          if (missing !== Number.isNaN(right)) {
            return missing ? 1 : -1
          }
          if (first !== right && !missing) {
            return first < right ? -1 : 1
          }
        } else {
          const first = prior[cursor] as Types.NumerixComplex
          const right = later[cursor] as Types.NumerixComplex
          const missing = Number.isNaN(first.re) || Number.isNaN(first.im)
          if (missing !== (Number.isNaN(right.re) || Number.isNaN(right.im))) {
            return missing ? 1 : -1
          }
          const delta = (
            first.re < right.re
              ? -1
              : first.re > right.re
              ? 1
              : Number.isNaN(first.re) === Number.isNaN(right.re)
              ? 0
              : Number.isNaN(first.re)
              ? 1
              : -1
          ) || (
            first.im < right.im
              ? -1
              : first.im > right.im
              ? 1
              : Number.isNaN(first.im) === Number.isNaN(right.im)
              ? 0
              : Number.isNaN(first.im)
              ? 1
              : -1
          )
          if (delta !== 0) {
            return delta
          }
        }
      }
      return alpha - omega
    })
    : (Sort.argsort(items as number[]) as number[])
  const sorted: unknown[] = []
  const counts: number[] = []
  const indices: number[] = []
  const inverse = counted ? new Array<number>(items.length) : undefined
  for (let index = 0; index < order.length; index++) {
    const origin = order[index] ?? 0
    const current = values[origin]
    const previous = sorted[sorted.length - 1]
    let matched = false
    if (sorted.length > 0) {
      if (matrix) {
        const prior = previous as (number | Types.NumerixComplex)[]
        const slice = current as (number | Types.NumerixComplex)[]
        if (prior.length === slice.length) {
          matched = true
          if (!complex) {
            for (let cursor = 0; cursor < prior.length; cursor++) {
              const reals = prior[cursor] as number
              const later = slice[cursor] as number
              if (!(equal && Number.isNaN(reals) ? Number.isNaN(later) : reals === later)) {
                matched = false
                break
              }
            }
          } else {
            for (let cursor = 0; cursor < prior.length; cursor++) {
              const entry = prior[cursor] as Types.NumerixComplex
              const later = slice[cursor] as Types.NumerixComplex
              if (
                !(equal
                  ? (Number.isNaN(entry.re) ? Number.isNaN(later.re) : entry.re === later.re) &&
                    (Number.isNaN(entry.im) ? Number.isNaN(later.im) : entry.im === later.im)
                  : entry.re === later.re && entry.im === later.im)
              ) {
                matched = false
                break
              }
            }
          }
        }
      } else {
        matched = Internal.equals(previous, current, equal)
      }
    }
    if (!matched) {
      sorted.push(current)
      if (counted) {
        counts.push(1)
        indices.push(origin)
      }
    } else if (counted) {
      counts[counts.length - 1] = (counts[counts.length - 1] ?? 0) + 1
    }
    if (inverse) {
      inverse[origin] = sorted.length - 1
    }
  }
  const output = !matrix || resolved === 0
    ? sorted
    : sorted.length === 0
    ? first.map(() => [])
    : Shape.transpose(sorted)
  return counted
    ? ({ values: output as number[], counts, indices, inverse: inverse! } as Types.NumerixUnique)
    : (output as number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][])
}
