import * as Internal from '@app/internal/index.ts'

/**
 * Build a Hanning window.
 * @description Generates a symmetric raised cosine window.
 * @param length - Number of window samples to produce
 * @returns Hanning window values
 */
export default function hanning(length: number): number[] {
  return Internal.window(length, 0.5, 0.5)
}
