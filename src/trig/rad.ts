import * as Internal from '@app/internal/index.ts'

/**
 * Convert degrees to radians.
 * @description Scales each element by the degree to radian factor.
 * @param value - Scalar, vector, or matrix angles in degrees
 * @returns Angle values in radians matching the input shape
 */
export default function rad(value: number | number[] | number[][]): number | number[] | number[][] {
  return Internal.unary(value, (scalar) => (scalar * Math.PI) / 180)
}
