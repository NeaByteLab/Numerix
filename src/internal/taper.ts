/**
 * Build a symmetric window.
 * @description Evaluates the formula over half, then mirrors it.
 * @param length - Number of window samples to produce
 * @param value - Formula producing the sample at a half-window position
 * @returns Symmetric window values
 */
export default function taper(
  length: number,
  value: (index: number, last: number) => number
): number[] {
  if (length <= 0) {
    return []
  }
  if (length === 1) {
    return [1]
  }
  const result = new Array<number>(length)
  const last = length - 1
  const half = last >> 1
  for (let index = 0; index <= half; index++) {
    const sample = value(index, last)
    result[index] = sample
    result[last - index] = sample
  }
  return result
}
