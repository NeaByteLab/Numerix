/**
 * Build a range of numbers.
 * @description Generates evenly spaced values between two bounds.
 * @param start - First value or lower bound
 * @param finish - Upper bound when separate from the start
 * @param stride - Spacing between generated values
 * @returns Array of generated values
 */
export default function range(start: number, finish?: number, stride = 1): number[] {
  if (stride === 0) {
    throw new RangeError('Step must not be zero')
  }
  const first = finish === undefined ? 0 : start
  return Array.from(
    { length: Math.max(0, Math.ceil(((finish === undefined ? start : finish) - first) / stride)) },
    (_outer, index) => first + index * stride
  )
}
