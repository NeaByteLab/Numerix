/**
 * Interpolate values at query points.
 * @description Performs piecewise linear interpolation between known points.
 * @param query - Positions where values are requested
 * @param points - Sorted sample positions of the known values
 * @param values - Sample values paired with the positions
 * @param left - Value returned for queries below the range
 * @param right - Value returned for queries above the range
 * @returns Interpolated values at the query positions
 */
export default function interp(
  query: number | number[],
  points: number[],
  values: number[],
  left?: number,
  right?: number
): number | number[] {
  const count = points.length
  const first = points[0] ?? 0
  const start = left ?? (values[0] ?? 0)
  const last = points[count - 1] ?? first
  const stop = right ?? (values[count - 1] ?? start)
  if (Array.isArray(query)) {
    const length = query.length
    const result = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      result[index] = interpScalar(
        query[index] ?? 0,
        points,
        values,
        first,
        start,
        last,
        stop
      )
    }
    return result
  }
  return interpScalar(query, points, values, first, start, last, stop)
}

/**
 * Interpolate one query value.
 * @description Interpolates between the surrounding sample points.
 * @param value - Position where the value is requested
 * @param points - Sorted sample positions of the known values
 * @param values - Sample values paired with the positions
 * @param low - Lowest sample position
 * @param below - Value returned below the sample range
 * @param high - Highest sample position
 * @param above - Value returned above the sample range
 * @returns Interpolated value at the query position
 */
function interpScalar(
  value: number,
  points: number[],
  values: number[],
  low: number,
  below: number,
  high: number,
  above: number
): number {
  if (value < low) {
    return below
  }
  if (value > high) {
    return above
  }
  if (value === low) {
    return values[0] ?? below
  }
  if (value === high) {
    return values[values.length - 1] ?? above
  }
  let start = 0
  let stop = points.length - 1
  while (stop - start > 1) {
    const middle = (start + stop) >> 1
    if ((points[middle] ?? 0) <= value) {
      start = middle
    } else {
      stop = middle
    }
  }
  const begin = points[start] ?? 0
  const end = points[stop] ?? begin
  const first = values[start] ?? 0
  const last = values[stop] ?? first
  const fraction = (value - begin) / (end - begin)
  return first + fraction * (last - first)
}
