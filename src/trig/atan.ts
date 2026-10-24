import * as Internal from '@app/internal/index.ts'

/**
 * Compute inverse tangent of each element.
 * @description Uses atan2 when both operands are supplied.
 * @param opposite - Numerator of the tangent ratio
 * @param adjacent - Denominator of the tangent ratio when given
 * @returns Arctangent values matching the input nesting shape
 */
export default function atan(
  opposite: number | number[] | number[][],
  adjacent?: number | number[] | number[][]
): number | number[] | number[][] {
  if (adjacent !== undefined) {
    return Internal.broadcast(opposite, adjacent, Math.atan2)
  }
  return Internal.unary(opposite, Math.atan)
}
