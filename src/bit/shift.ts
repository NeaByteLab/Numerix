import * as Internal from '@app/internal/index.ts'

/**
 * Shift the bits of each element.
 * @description Moves bits left or right by the given count.
 * @param value - Scalar, vector, or matrix values to shift
 * @param bits - Number of bit positions to shift
 * @param right - When true shifts bits toward the low end
 * @returns Shifted values matching the input nesting shape
 */
export default function shift(
  value: number | number[] | number[][],
  bits: number | number[],
  right = false
): number | number[] | number[][] {
  const apply = right
    ? (first: number, second: number) => first >> second
    : (first: number, second: number) => first << second
  return Internal.broadcast(value, bits, apply)
}
