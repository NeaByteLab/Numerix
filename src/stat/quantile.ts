import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Compute quantiles of values.
 * @description Reports values at the requested probabilities.
 * @param values - Values whose quantiles are computed
 * @param chance - Probability or probabilities of interest
 * @param percent - When true, treats probabilities as percentiles
 * @param ignore - Whether invalid entries are skipped
 * @param level - Optional axis along which to compute quantiles
 * @returns Quantile values for the requested probabilities
 */
export default function quantile(
  values: unknown[],
  chance: number | number[] | number[][],
  percent: boolean | number = false,
  ignore: boolean | number = false,
  level?: number
): number | number[] | number[][] | number[][][] {
  const chosen = typeof percent === 'number' ? percent : typeof ignore === 'number' ? ignore : level
  if (Array.isArray(values[0])) {
    if (chosen === undefined) {
      return quantile(Shape.flatten<number>(values), chance, percent === true, ignore === true)
    }
    const matrix = values as number[][]
    const normalized = chosen < 0 ? 2 + chosen : chosen
    if (normalized !== 0 && normalized !== 1) {
      throw new RangeError('axis is out of bounds for array of dimension 2')
    }
    const width = matrix[0]?.length ?? 0
    if (normalized === 0 && width === 0) {
      quantile([], chance, percent === true, ignore === true)
      return Array.isArray(chance)
        ? chance.map((entry) =>
          Array.isArray(entry) ? Array.from({ length: entry.length }, () => []) : []
        )
        : []
    }
    const height = matrix.length
    const buffer = normalized === 0 ? new Array<number>(height) : undefined
    const result = normalized === 0
      ? Array.from(
        { length: width },
        (_unused, inner) =>
          quantile(
            Internal.column(matrix, height, inner, buffer!, 0),
            chance,
            percent === true,
            ignore === true
          )
      )
      : matrix.map((slice) => quantile(slice ?? [], chance, percent === true, ignore === true))
    if (Array.isArray(chance)) {
      return Array.isArray(chance[0])
        ? (chance as number[][]).map((slice, outer) =>
          slice.map((_unused, inner) =>
            result.map((entry) => ((entry as number[][])[outer]?.[inner]) ?? 0)
          )
        )
        : (chance as number[]).map((_unused, outer) =>
          result.map((entry) => ((entry as number[])[outer]) ?? 0)
        )
    }
    return result as number[]
  }
  if (chosen !== undefined && chosen !== 0 && chosen !== -1) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  const length = values.length
  const buffer = new Float64Array(length)
  let count = 0
  let missing = false
  for (let index = 0; index < length; index++) {
    const entry = values[index]
    if (Internal.shape(entry)) {
      throw new TypeError('a must be an array of real numbers')
    }
    const value = (entry as number | undefined) ?? 0
    if (Number.isNaN(value)) {
      if (ignore !== true) {
        missing = true
      }
      continue
    }
    if (!missing) {
      buffer[count++] = value
    }
  }
  const sorted = count === length ? buffer : buffer.subarray(0, count)
  if (!missing && count > 1) {
    sorted.sort()
  }
  return Internal.mapper(chance, (target) => {
    const fraction = percent === true ? target * 0.01 : target
    if (Number.isNaN(fraction) || fraction < 0 || fraction > 1) {
      throw new RangeError('quantiles must be in the range [0, 1]')
    }
    if (count === 0 || missing) {
      return NaN
    }
    const position = fraction * (count - 1)
    const lower = Math.floor(position)
    const start = sorted[lower] ?? 0
    const finish = sorted[Math.min(count - 1, lower + 1)] ?? start
    const weight = position - lower
    return weight === 0
      ? start
      : weight >= 0.5
      ? finish - (finish - start) * (1 - weight)
      : start + (finish - start) * weight
  })
}
