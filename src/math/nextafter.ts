import * as Internal from '@app/internal/index.ts'

/**
 * Compute the next representable value.
 * @description Steps each element toward positive or negative infinity.
 * @param start - Starting operand as scalar, vector, or matrix
 * @param direction - Direction operand as scalar, vector, or matrix
 * @returns Adjacent values matching the broadcast shape of the operands
 */
export default function nextafter(
  start: number | number[] | number[][],
  direction: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.broadcast(start, direction, step) as number | number[] | number[][]
}

/**
 * Step one value toward another.
 * @description Moves the start value to its adjacent representable neighbour.
 * @param start - Value to step from
 * @param direction - Value that selects the neighbouring step
 * @returns The adjacent representable value
 */
function step(start: number, direction: number): number {
  if (Number.isNaN(start) || Number.isNaN(direction)) {
    return NaN
  }
  if (start === direction) {
    return direction
  }
  if (start === 0) {
    return direction > 0 ? Number.MIN_VALUE : -Number.MIN_VALUE
  }
  Internal.bits.float[0] = start
  const bits = Internal.bits.uint[0] ?? 0n
  Internal.bits.uint[0] = ((start > 0 && direction > start) ||
      (start < 0 && direction < start))
    ? bits + 1n
    : bits - 1n
  return Internal.bits.float[0] ?? start
}
