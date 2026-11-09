import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the arithmetic mean.
 * @description Averages values along the requested axis.
 * @param values - Values whose mean is computed
 * @param invalid - Whether invalid entries are skipped
 * @param level - Axis along which the mean is taken
 * @returns Mean for the requested axis
 */
export default function mean(
  values: unknown[],
  invalid: boolean | number = false,
  level?: number
): number | number[] | Types.NumerixComplex | Types.NumerixComplex[] {
  const parsed = Internal.nanarg(invalid, level)
  const layered = Array.isArray(values[0])
  const complex = Internal.classify(values, true, true) === true
  if (parsed.target !== undefined) {
    const normalized = parsed.target < 0 ? (layered ? 2 : 1) + parsed.target : parsed.target
    if (normalized < 0 || normalized > (layered ? 1 : 0)) {
      throw new RangeError(`axis is out of bounds for array of dimension ${layered ? 2 : 1}`)
    }
    if (layered) {
      const matrix = values as unknown[][]
      const height = matrix.length
      const horizontal = normalized === 1
      const buffer = horizontal ? undefined : new Array<unknown>(height)
      return Array.from(
        { length: horizontal ? height : (matrix[0]?.length ?? 0) },
        (_outer, index) => {
          const value = mean(
            horizontal ? (matrix[index] ?? []) : Internal.column(matrix, height, index, buffer!, 0),
            parsed.skip
          ) as number | Types.NumerixComplex
          return complex && typeof value === 'number'
            ? { re: value, im: Number.isNaN(value) ? NaN : 0 }
            : value
        }
      ) as number[] | Types.NumerixComplex[]
    }
  }
  const state = Internal.total(values, parsed.skip)
  if (!complex) {
    return state.count === 0 ? NaN : state.sum / state.count
  }
  return state.count === 0 || Number.isNaN(state.sum) || Number.isNaN(state.imags)
    ? { re: NaN, im: NaN }
    : { re: state.sum / state.count, im: state.imags / state.count }
}
