import * as Internal from '@app/internal/index.ts'

/**
 * Convert radians to degrees.
 * @description Scales each element by the radian to degree factor.
 * @param value - Scalar, vector, or matrix angles in radians
 * @returns Angle values in degrees matching the input shape
 */
export default function deg(value: number | number[] | number[][]): number | number[] | number[][] {
  return Internal.unary(value, (scalar) => (scalar * 180) / Math.PI)
}
