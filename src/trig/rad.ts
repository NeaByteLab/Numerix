import * as Internal from '@app/internal/index.ts'

/**
 * Convert degrees to radians.
 * @description Scales each element by the degree-to-radian factor.
 * @param input - Scalar, vector, or matrix angles in degrees
 * @returns Angle values in radians matching the input shape
 */
export default function rad(
  input: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(input, (scalar) => (scalar * Math.PI) / 180)
}
