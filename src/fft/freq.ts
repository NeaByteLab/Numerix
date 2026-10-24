/**
 * Compute the frequency bins.
 * @description Reports the frequency of each spectral bin.
 * @param count - Number of bins in the transform
 * @param spacing - Sample spacing of the original signal
 * @param real - When true returns only the positive bins
 * @returns Frequency of each spectral bin
 */
export default function freq(
  count: number,
  spacing: number = 1,
  real: boolean = false
): number[] {
  const scale = 1 / (spacing * count)
  if (real) {
    const length = (count >> 1) + 1
    const result = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      result[index] = index * scale
    }
    return result
  }
  const middle = Math.ceil(count / 2)
  const result = new Array<number>(count)
  for (let index = 0; index < middle; index++) {
    result[index] = index * scale
  }
  for (let index = middle; index < count; index++) {
    result[index] = (index - count) * scale
  }
  return result
}
