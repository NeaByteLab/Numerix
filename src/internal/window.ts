import taper from '@app/internal/taper.ts'

/**
 * Build a symmetric cosine window.
 * @description Generates window samples from two cosine coefficients.
 * @param length - Number of window samples to produce
 * @param center - Constant term of the cosine expression
 * @param amplitude - Cosine coefficient of the expression
 * @returns Symmetric window values
 */
export default function window(length: number, center: number, amplitude: number): number[] {
  const step = length > 1 ? (2 * Math.PI) / (length - 1) : 0
  return taper(length, (index) => center - amplitude * Math.cos(step * index))
}
