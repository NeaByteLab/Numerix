/**
 * Build a range of numbers.
 * @description Generates evenly spaced values between two bounds.
 * @param start - First value or lower bound
 * @param stop - Upper bound when separate from the start
 * @param step - Spacing between generated values
 * @returns Array of generated values
 */
export default function range(start: number, stop?: number, step = 1): number[] {
  if (step === 0) {
    throw new RangeError('Step must not be zero')
  }
  const first = stop === undefined ? 0 : start
  const last = stop === undefined ? start : stop
  const length = Math.max(0, Math.ceil((last - first) / step))
  const result = new Array<number>(length)
  for (let index = 0; index < length; index++) {
    result[index] = first + index * step
  }
  return result
}
