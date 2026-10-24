import * as Internal from '@app/internal/index.ts'

/**
 * Build a Bartlett window.
 * @description Generates a triangular window of the given length.
 * @param length - Number of window samples to produce
 * @returns Bartlett window values
 */
export default function bartlett(length: number): number[] {
  const step = length > 1 ? 2 / (length - 1) : 0
  return Internal.taper(length, (index) => index * step)
}
