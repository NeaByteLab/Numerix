import type * as Types from '@app/types.ts'
import beats from '@app/internal/beats.ts'
import classify from '@app/internal/classify.ts'
import column from '@app/internal/column.ts'
import nanarg from '@app/internal/nanarg.ts'
import nested from '@app/internal/nested.ts'
import pair from '@app/internal/pair.ts'
import shape from '@app/internal/shape.ts'

/**
 * Find the extreme value of values.
 * @description Searches for the extreme entry along an axis.
 * @param values - Values to search for the extreme
 * @param missing - Invalid entries or a flag to skip them
 * @param ignore - Whether invalid entries are skipped
 * @param wanted - Axis along which the extreme is sought
 * @param direction - Whether the smallest or largest entry wins
 * @returns Extreme value for the requested axis
 */
export default function extreme(
  values: unknown[],
  missing: unknown[] | boolean | number | undefined,
  ignore: boolean | number,
  wanted: number | undefined,
  direction: Types.NumerixDirection
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  const competing = Array.isArray(missing) ? missing : undefined
  const parsed = nanarg(
    typeof missing === 'number' || typeof missing === 'boolean' ? missing : undefined,
    wanted,
    ignore
  )
  if (competing !== undefined && (parsed.target === undefined || !Array.isArray(values[0]))) {
    return pair(values, competing, parsed.skip, direction)
  }
  const planar = Array.isArray(values[0])
  if (!planar && parsed.target !== undefined && parsed.target !== 0 && parsed.target !== -1) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  if (planar && parsed.target !== undefined) {
    if (
      parsed.target !== 1 &&
      parsed.target !== -1 &&
      parsed.target !== 0 &&
      parsed.target !== -2
    ) {
      throw new RangeError('axis is out of bounds for array of dimension 2')
    }
    const matrix = values as unknown[][]
    const height = matrix.length
    const horizontal = parsed.target === 1 || parsed.target === -1
    const complex = classify(matrix, true, true) === true
    const buffer = horizontal ? undefined : new Array<unknown>(height)
    return Array.from(
      { length: horizontal ? height : (matrix[0]?.length ?? 0) },
      (_outer, index) => {
        const value = extreme(
          horizontal ? (matrix[index] ?? []) : column(matrix, height, index, buffer!, 0),
          undefined,
          parsed.skip,
          undefined,
          direction
        ) as number | Types.NumerixComplex
        return complex && typeof value === 'number' ? { re: value, im: 0 } : value
      }
    ) as number[] | Types.NumerixComplex[]
  }
  const outer = planar ? (values as unknown[][]) : [values]
  let total = 0
  let complex = false
  let reals = direction === 'min' ? Infinity : -Infinity
  let imags = reals
  let found = false
  let invalid = false
  let initial: unknown
  for (let slice = 0; slice < outer.length; slice++) {
    const items = (outer[slice] ?? []) as unknown[]
    for (let inner = 0; inner < items.length; inner++) {
      const entry = items[inner]
      if (total === 0) {
        initial = entry
      }
      total++
      if (typeof entry === 'number') {
        if (invalid) {
          continue
        }
        if (Number.isNaN(entry)) {
          if (parsed.skip) {
            continue
          }
          reals = entry
          imags = 0
          invalid = true
          continue
        }
        if (
          !found ||
          beats(entry, reals, direction) ||
          (entry === reals && beats(0, imags, direction))
        ) {
          reals = entry
          imags = 0
        }
        found = true
        continue
      }
      const shaped = shape(entry)
      if (shaped) {
        complex = true
      }
      if (invalid) {
        continue
      }
      const alpha = shaped ? entry.re : Number(entry ?? 0)
      const omega = shaped ? entry.im : 0
      if (Number.isNaN(alpha) || Number.isNaN(omega)) {
        if (parsed.skip) {
          continue
        }
        reals = alpha
        imags = omega
        invalid = true
        continue
      }
      if (
        !found ||
        beats(alpha, reals, direction) ||
        (alpha === reals && beats(omega, imags, direction))
      ) {
        reals = alpha
        imags = omega
      }
      found = true
    }
  }
  if (total === 0) {
    throw new RangeError('zero-size array to reduction operation which has no identity')
  }
  if (invalid) {
    return complex ? { re: reals, im: imags } : NaN
  }
  if (!found) {
    return complex ? (nested(initial ?? 0) as Types.NumerixComplex) : NaN
  }
  return complex ? { re: reals, im: imags } : reals
}
