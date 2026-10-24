import * as Internal from '@app/internal/index.ts'

/**
 * Invert the bits of each element.
 * @description Flips every bit in the nested input.
 * @param value - Scalar, vector, or matrix values to invert
 * @returns Inverted values matching the input nesting shape
 */
export default function not(value: number | number[] | number[][]): number | number[] | number[][] {
  return Internal.unary(value, (scalar) => ~scalar)
}
