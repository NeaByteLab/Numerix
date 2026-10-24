/**
 * Sort the finite values of data.
 * @description Sorts every entry that is not NaN.
 * @param values - Values to sort
 * @returns Ascending typed array holding the values that are not NaN
 */
export default function finite(values: number[]): Float64Array {
  const length = values.length
  let missing = 0
  for (let index = 0; index < length; index++) {
    if (Number.isNaN(values[index] ?? 0)) {
      missing++
    }
  }
  if (missing === 0) {
    const typed = Float64Array.from(values)
    typed.sort()
    return typed
  }
  const finite = new Float64Array(length - missing)
  let cursor = 0
  for (let index = 0; index < length; index++) {
    const value = values[index] ?? 0
    if (!Number.isNaN(value)) {
      finite[cursor++] = value
    }
  }
  finite.sort()
  return finite
}
