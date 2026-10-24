import * as Internal from '@app/internal/index.ts'

/**
 * Build a Blackman window.
 * @description Generates a cosine window of the given length.
 * @param length - Number of window samples to produce
 * @returns Blackman window values
 */
export default function blackman(length: number): number[] {
  const step = length > 1 ? (2 * Math.PI) / (length - 1) : 0
  return Internal.taper(length, (index) => {
    const phase = step * index
    return 0.42 - 0.5 * Math.cos(phase) + 0.08 * Math.cos(2 * phase)
  })
}
