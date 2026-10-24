import * as Internal from '@app/internal/index.ts'

/**
 * Build a Hamming window.
 * @description Generates a symmetric cosine window.
 * @param length - Number of window samples to produce
 * @returns Hamming window values
 */
export default function hamming(length: number): number[] {
  return Internal.window(length, 0.54, 0.46)
}
