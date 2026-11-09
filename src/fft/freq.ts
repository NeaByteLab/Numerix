/**
 * Compute the frequency bins.
 * @description Reports the frequency of each spectral bin.
 * @param count - Number of bins in the transform
 * @param spacing - Sample spacing of the original signal
 * @param positive - When true, returns only the positive bins
 * @returns Frequency of each spectral bin
 */
export default function freq(
  count: number,
  spacing: number = 1,
  positive: boolean = false
): number[] {
  if (count <= 0) {
    throw new RangeError('Window length must be a positive integer')
  }
  if (spacing === 0) {
    throw new RangeError('Sample spacing must be non-zero')
  }
  return Array.from(
    { length: positive ? (count >> 1) + 1 : count },
    (_outer, index) =>
      (positive || index < (count + 1) >> 1 ? index : index - count) / (spacing * count)
  )
}
