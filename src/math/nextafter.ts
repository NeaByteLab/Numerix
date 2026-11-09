import * as Internal from '@app/internal/index.ts'

/**
 * Compute the next representable value.
 * @description Steps each element toward positive or negative infinity.
 * @param start - Starting operand as a scalar, vector, or matrix
 * @param direction - Direction operand as a scalar, vector, or matrix
 * @returns Adjacent values matching the broadcast shape of the operands
 */
export default function nextafter(
  start: number | number[] | number[][],
  direction: number | number[] | number[][]
): number | number[] | number[][] {
  return Internal.broadcast(start, direction, (origin, target) => {
    if (Number.isNaN(origin) || Number.isNaN(target)) {
      return NaN
    }
    if (origin === target) {
      return target
    }
    if (origin === 0) {
      return target > 0 ? Number.MIN_VALUE : -Number.MIN_VALUE
    }
    Internal.bits.float[0] = origin
    const pattern = Internal.bits.uint[0] ?? 0n
    Internal.bits.uint[0] = ((origin > 0 && target > origin) ||
        (origin < 0 && target < origin))
      ? pattern + 1n
      : pattern - 1n
    return Internal.bits.float[0] ?? origin
  }) as number | number[] | number[][]
}
