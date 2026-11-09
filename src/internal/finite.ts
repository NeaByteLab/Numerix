/**
 * Sort the finite values of an array.
 * @description Sorts every entry that is not NaN.
 * @param values - Values to sort
 * @returns Ascending typed array holding the values that are not NaN
 */
export default function finite(values: number[]): Float64Array {
  const buffer = new Float64Array(values.length)
  let count = 0
  for (let index = 0; index < values.length; index++) {
    const value = values[index] ?? 0
    if (!Number.isNaN(value)) {
      buffer[count++] = value
    }
  }
  return (count === values.length ? buffer : buffer.subarray(0, count)).sort()
}
