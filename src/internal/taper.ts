/**
 * Build a symmetric window.
 * @description Evaluates the formula over half, then mirrors it.
 * @param length - Number of window samples to produce
 * @param value - Formula producing the sample at a half-window position
 * @returns Symmetric window values
 */
export default function taper(
  length: number,
  value: (index: number, final: number) => number
): number[] {
  if (length <= 0) {
    return []
  }
  if (length === 1) {
    return [1]
  }
  const result = new Array<number>(length)
  const final = length - 1
  for (let index = 0; index <= final >> 1; index++) {
    const sample = value(index, final)
    result[index] = sample
    result[final - index] = sample
  }
  return result
}
