/**
 * Repeat text a fixed count.
 * @description Concatenates each string with itself repeatedly.
 * @param left - String or array of strings to repeat
 * @param count - Number of repetitions for each string
 * @returns Repeated strings matching the input shape
 */
export default function multiply(left: string | string[], count: number): string | string[] {
  const times = count > 0 ? Math.trunc(count) : 0
  if (Array.isArray(left)) {
    const length = left.length
    const result = new Array<string>(length)
    for (let index = 0; index < length; index++) {
      result[index] = (left[index] ?? '').repeat(times)
    }
    return result
  }
  return left.repeat(times)
}
