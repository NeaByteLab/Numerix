import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the variance of values.
 * @description Measures the spread around the mean.
 * @param values - Values whose variance is computed
 * @param freedom - Degrees of freedom used in the divisor
 * @param invalid - Whether invalid entries are skipped
 * @param level - Axis along which the variance is taken
 * @returns Variance for the requested axis
 */
export default function variance(
  values: unknown[],
  freedom: number | boolean = 0,
  invalid: boolean | number = false,
  level?: number | boolean
): number | number[] {
  const divisor = typeof freedom === 'number'
    ? freedom
    : typeof invalid === 'number' && typeof level === 'number'
    ? invalid
    : 0
  const ignore = freedom === true || invalid === true || level === true
  const chosen = typeof level === 'number'
    ? level
    : typeof invalid === 'number'
    ? invalid
    : undefined
  const layered = Array.isArray(values[0])
  if (chosen !== undefined) {
    const normalized = chosen < 0 ? (layered ? 2 : 1) + chosen : chosen
    if (normalized < 0 || normalized > (layered ? 1 : 0)) {
      throw new RangeError(`axis is out of bounds for array of dimension ${layered ? 2 : 1}`)
    }
    if (layered) {
      if (normalized === 1) {
        return (values as unknown[][]).map((slice) =>
          variance(slice ?? [], divisor, ignore) as number
        )
      }
      const height = values.length
      const buffer = new Array<unknown>(height)
      return Array.from(
        { length: (values[0] as unknown[] | undefined)?.length ?? 0 },
        (_unused, inner) =>
          variance(
            Internal.column(values as unknown[][], height, inner, buffer, 0),
            divisor,
            ignore
          ) as number
      )
    }
  }
  const state = Internal.total(values, ignore)
  if (state.count <= divisor) {
    return NaN
  }
  const reals = state.sum / state.count
  let squared = 0
  if (Internal.classify(values, true, true) !== true) {
    if (layered) {
      for (let outer = 0; outer < values.length; outer++) {
        const slice = (values[outer] ?? []) as number[]
        for (let column = 0; column < slice.length; column++) {
          const first = Number(slice[column] ?? 0)
          if (ignore && Number.isNaN(first)) {
            continue
          }
          squared += (first - reals) ** 2
        }
      }
    } else {
      for (let index = 0; index < values.length; index++) {
        const first = Number((values as number[])[index] ?? 0)
        if (ignore && Number.isNaN(first)) {
          continue
        }
        squared += (first - reals) ** 2
      }
    }
    return squared / (state.count - divisor)
  }
  const imags = state.imags / state.count
  if (layered) {
    for (let outer = 0; outer < values.length; outer++) {
      const slice = (values[outer] ?? []) as unknown[]
      for (let column = 0; column < slice.length; column++) {
        const entry = (slice[column] ?? 0) as number | Types.NumerixComplex
        const first = Internal.shape(entry) ? entry.re : Number(entry)
        const second = Internal.shape(entry) ? entry.im : 0
        if (ignore && (Number.isNaN(first) || Number.isNaN(second))) {
          continue
        }
        squared += (first - reals) ** 2 + (second - imags) ** 2
      }
    }
  } else {
    for (let index = 0; index < values.length; index++) {
      const entry = (values[index] ?? 0) as number | Types.NumerixComplex
      const first = Internal.shape(entry) ? entry.re : Number(entry)
      const second = Internal.shape(entry) ? entry.im : 0
      if (ignore && (Number.isNaN(first) || Number.isNaN(second))) {
        continue
      }
      squared += (first - reals) ** 2 + (second - imags) ** 2
    }
  }
  return squared / (state.count - divisor)
}
