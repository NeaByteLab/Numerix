import * as Internal from '@app/internal/index.ts'

/**
 * Convert radians to degrees.
 * @description Scales each element by the radian-to-degree factor.
 * @param input - Scalar, vector, or matrix angles in radians
 * @returns Angle values in degrees matching the input shape
 */
export default function deg(
  input: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.unary(input, (scalar) => (scalar * 180) / Math.PI)
}
