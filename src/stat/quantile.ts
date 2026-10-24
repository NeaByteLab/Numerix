import * as Shape from '@app/shape/index.ts'

/**
 * Compute one quantile from sorted values.
 * @description Interpolates the requested probability from sorted entries.
 * @param sorted - Sorted values used for the interpolation
 * @param count - Number of valid sorted entries
 * @param nan - Whether invalid entries are present
 * @param percentile - When true treats the probability as a percentile
 * @param requested - Probability whose value is sought
 * @returns Quantile value at the requested probability
 */
function computeQuantile(
  sorted: Float64Array,
  count: number,
  nan: boolean,
  percentile: boolean,
  requested: number
): number {
  if (count === 0 || nan) {
    return NaN
  }
  const fraction = percentile ? requested * 0.01 : requested
  const position = fraction * (count - 1)
  const lower = Math.floor(position)
  const upper = Math.ceil(position)
  const interpolation = position - lower
  const start = sorted[lower] ?? 0
  const stop = sorted[upper] ?? start
  return start + interpolation * (stop - start)
}

/**
 * Compute quantiles of values.
 * @description Reports values at the requested probabilities.
 * @param values - Values whose quantiles are computed
 * @param probability - Probability or probabilities of interest
 * @param percentile - When true treats probabilities as percentiles
 * @param skip - Whether invalid entries are skipped
 * @returns Quantile values for the requested probabilities
 */
export default function quantile(
  values: unknown[],
  probability: number | number[],
  percentile = false,
  skip = false
): number | number[] {
  const flat = Array.isArray(values[0]) ? Shape.flatten<number>(values) : (values as number[])
  const length = flat.length
  const buffer = new Float64Array(length)
  let count = 0
  let nan = false
  for (let index = 0; index < length; index++) {
    const value = flat[index] ?? 0
    if (Number.isNaN(value)) {
      if (!skip) {
        nan = true
        break
      }
      continue
    }
    buffer[count++] = value
  }
  const sorted = count === length ? buffer : buffer.subarray(0, count)
  if (!nan && count > 1) {
    sorted.sort()
  }
  if (Array.isArray(probability)) {
    const length = probability.length
    const quantiles = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      quantiles[index] = computeQuantile(
        sorted,
        count,
        nan,
        percentile,
        probability[index] ?? 0
      )
    }
    return quantiles
  }
  return computeQuantile(sorted, count, nan, percentile, probability)
}
