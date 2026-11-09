import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'
import * as Sort from '@app/sort/index.ts'
import distinct from '@app/set/unique.ts'

/**
 * Compute the intersection of two sets.
 * @description Keeps values present in both sets.
 * @param first - Values of the first set
 * @param right - Values of the second set
 * @param unique - Whether inputs are assumed to be unique
 * @param indexed - Whether to return the indices of common values
 * @returns Values shared by both sets or a tuple of values with their first and second indices
 */
export default function intersect(
  first: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  right: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  unique = false,
  indexed = false
):
  | number[]
  | Types.NumerixComplex[]
  | [number[] | Types.NumerixComplex[], number[], number[]] {
  const source = Array.isArray(first[0]) ? Shape.flatten(first) : (first as unknown[])
  const second = Array.isArray(right[0]) ? Shape.flatten(right) : (right as unknown[])
  const complex = Internal.classify(source, true, true) === true ||
    Internal.classify(second, true, true) === true
  if (!indexed) {
    const merged = (unique ? source : (distinct(source, false) as unknown[])).concat(
      unique ? second : (distinct(second, false) as unknown[])
    )
    if (!complex) {
      const sorted = Sort.order(
        unique
          ? merged.map((entry) => {
            const reals = Number(entry ?? 0)
            return reals === 0 ? 0 : reals
          })
          : (merged as number[])
      ) as number[]
      const result: number[] = []
      for (let index = 0; index < sorted.length - 1; index++) {
        const current = sorted[index]!
        if (current === sorted[index + 1]) {
          result.push(current)
        }
      }
      return result
    }
    const combined = Sort.order(
      unique
        ? merged.map((entry) => {
          const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
          const imags = Internal.shape(entry) ? entry.im : 0
          return {
            re: reals === 0 ? 0 : reals,
            im: imags === 0 ? 0 : imags
          }
        })
        : (merged as Types.NumerixComplex[])
    ) as Types.NumerixComplex[]
    const result: Types.NumerixComplex[] = []
    for (let index = 0; index < combined.length - 1; index++) {
      const current = combined[index]!
      if (Internal.equals(current, combined[index + 1])) {
        result.push(current)
      }
    }
    return result
  }
  if (!complex) {
    const positions = new Map<number, number>()
    for (let index = 0; index < second.length; index++) {
      const reals = Number(second[index] ?? 0)
      if (!Number.isNaN(reals)) {
        const token = reals === 0 ? 0 : reals
        if (!positions.has(token)) {
          positions.set(token, index)
        }
      }
    }
    const pairs: { re: number; first: number; second: number }[] = []
    for (let index = 0; index < source.length; index++) {
      const reals = Number(source[index] ?? 0)
      if (!Number.isNaN(reals)) {
        const token = reals === 0 ? 0 : reals
        const match = positions.get(token)
        if (match !== undefined) {
          positions.delete(token)
          pairs.push({ re: token, first: index, second: match })
        }
      }
    }
    pairs.sort((alpha, omega) => alpha.re - omega.re)
    const values = new Array<number>(pairs.length)
    const firsts = new Array<number>(pairs.length)
    const seconds = new Array<number>(pairs.length)
    for (let index = 0; index < pairs.length; index++) {
      const entry = pairs[index]!
      values[index] = entry.re
      firsts[index] = entry.first
      seconds[index] = entry.second
    }
    return [values, firsts, seconds]
  }
  const positions = new Map<string, number>()
  for (let index = 0; index < second.length; index++) {
    const entry = second[index]
    const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
    const imags = Internal.shape(entry) ? entry.im : 0
    if (!Number.isNaN(reals) && !Number.isNaN(imags)) {
      const token = `${reals},${imags}`
      if (!positions.has(token)) {
        positions.set(token, index)
      }
    }
  }
  const pairs: { re: number; im: number; first: number; second: number }[] = []
  for (let index = 0; index < source.length; index++) {
    const entry = source[index]
    const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
    const imags = Internal.shape(entry) ? entry.im : 0
    if (!Number.isNaN(reals) && !Number.isNaN(imags)) {
      const token = `${reals},${imags}`
      const match = positions.get(token)
      if (match !== undefined) {
        positions.delete(token)
        pairs.push({
          re: reals === 0 ? 0 : reals,
          im: imags === 0 ? 0 : imags,
          first: index,
          second: match
        })
      }
    }
  }
  pairs.sort((alpha, omega) => (alpha.re - omega.re) || (alpha.im - omega.im))
  const values = new Array<Types.NumerixComplex>(pairs.length)
  const firsts = new Array<number>(pairs.length)
  const seconds = new Array<number>(pairs.length)
  for (let index = 0; index < pairs.length; index++) {
    const entry = pairs[index]!
    values[index] = { re: entry.re, im: entry.im }
    firsts[index] = entry.first
    seconds[index] = entry.second
  }
  return [values, firsts, seconds]
}
