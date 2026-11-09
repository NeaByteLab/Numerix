import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Compute the median value.
 * @description Selects the middle value of sorted entries.
 * @param values - Values whose median is computed
 * @param invalid - Whether invalid entries are skipped
 * @param level - Axis along which the median is taken
 * @returns Median for the requested axis
 */
export default function median(
  values: unknown[],
  invalid: boolean | number = false,
  level?: number
): number | number[] | Types.NumerixComplex | Types.NumerixComplex[] {
  const parsed = Internal.nanarg(invalid, level)
  const matrix = Array.isArray(values[0])
  const complex = Internal.classify(values, true, true) === true
  if (parsed.target !== undefined) {
    const resolved = parsed.target < 0 ? (matrix ? 2 : 1) + parsed.target : parsed.target
    if (resolved < 0 || resolved >= (matrix ? 2 : 1)) {
      throw new RangeError(`axis is out of bounds for array of dimension ${matrix ? 2 : 1}`)
    }
    if (matrix) {
      if (resolved === 1) {
        return (values as unknown[][]).map((slice) => {
          const value = median(slice ?? [], parsed.skip) as number | Types.NumerixComplex
          return complex && typeof value === 'number' ? { re: value, im: 0 } : value
        }) as number[] | Types.NumerixComplex[]
      }
      const height = values.length
      const buffer = new Array<unknown>(height)
      return Array.from(
        { length: (values[0] as unknown[] | undefined)?.length ?? 0 },
        (_unused, inner) => {
          const value = median(
            Internal.column(values as unknown[][], height, inner, buffer, 0),
            parsed.skip
          ) as number | Types.NumerixComplex
          return complex && typeof value === 'number' ? { re: value, im: 0 } : value
        }
      ) as number[] | Types.NumerixComplex[]
    }
  }
  if (!complex) {
    if (!matrix) {
      const length = values.length
      if (length === 0) {
        return NaN
      }
      const buffer = new Float64Array(length)
      let count = 0
      for (let index = 0; index < length; index++) {
        const value = Number(values[index] ?? 0)
        if (Number.isNaN(value)) {
          if (!parsed.skip) {
            return NaN
          }
          continue
        }
        buffer[count++] = value
      }
      if (count === 0) {
        return NaN
      }
      const sorted = count === length ? buffer : buffer.subarray(0, count)
      if (count > 1) {
        sorted.sort()
      }
      const midpoint = count >> 1
      const upper = sorted[midpoint] ?? 0
      return (count & 1) === 1 ? upper : 0.5 * ((sorted[midpoint - 1] ?? upper) + upper)
    }
    let total = 0
    for (let outer = 0; outer < values.length; outer++) {
      total += ((values[outer] ?? []) as unknown[]).length
    }
    if (total === 0) {
      return NaN
    }
    const buffer = new Float64Array(total)
    let count = 0
    for (let outer = 0; outer < values.length; outer++) {
      const slice = (values[outer] ?? []) as unknown[]
      for (let inner = 0; inner < slice.length; inner++) {
        const value = Number(slice[inner] ?? 0)
        if (Number.isNaN(value)) {
          if (!parsed.skip) {
            return NaN
          }
          continue
        }
        buffer[count++] = value
      }
    }
    if (count === 0) {
      return NaN
    }
    const sorted = count === total ? buffer : buffer.subarray(0, count)
    if (count > 1) {
      sorted.sort()
    }
    const midpoint = count >> 1
    const upper = sorted[midpoint] ?? 0
    return (count & 1) === 1 ? upper : 0.5 * ((sorted[midpoint - 1] ?? upper) + upper)
  }
  const flattened = matrix ? Shape.flatten(values) : values
  const length = flattened.length
  if (length === 0) {
    return NaN
  }
  const filtered: Types.NumerixComplex[] = []
  let missing: Types.NumerixComplex | undefined
  for (let index = 0; index < length; index++) {
    const entry = flattened[index]
    const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
    const imags = Internal.shape(entry) ? entry.im : 0
    if (Number.isNaN(reals) || Number.isNaN(imags)) {
      if (
        parsed.skip ||
        !missing ||
        (Number.isNaN(reals) !== Number.isNaN(missing.re)
          ? Number.isNaN(reals)
          : reals > missing.re
          ? true
          : reals < missing.re
          ? false
          : Number.isNaN(imags) !== Number.isNaN(missing.im)
          ? Number.isNaN(imags)
          : imags > missing.im)
      ) {
        missing = { re: reals, im: imags }
      }
      continue
    }
    if (parsed.skip || !missing) {
      filtered.push({ re: reals, im: imags })
    }
  }
  if (!parsed.skip && missing) {
    return missing
  }
  const count = filtered.length
  if (count === 0) {
    return missing ?? { re: NaN, im: NaN }
  }
  filtered.sort((first, second) => first.re - second.re || first.im - second.im)
  const midpoint = count >> 1
  const upper = filtered[midpoint] ?? { re: 0, im: 0 }
  return (count & 1) === 1 ? upper : {
    re: 0.5 * ((filtered[midpoint - 1] ?? upper).re + upper.re),
    im: 0.5 * ((filtered[midpoint - 1] ?? upper).im + upper.im)
  }
}
