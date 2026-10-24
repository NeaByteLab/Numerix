import type * as Types from '@app/types.ts'
import allreduce from '@app/internal/allreduce.ts'
import axreduce from '@app/internal/axreduce.ts'
import nanarg from '@app/internal/nanarg.ts'
import reduceone from '@app/internal/reduceone.ts'

/**
 * Reduce values along an axis.
 * @description Combines values into a running value.
 * @param values - Values whose entries are combined
 * @param nan - Whether invalid entries are skipped
 * @param axis - Axis along which the entries are combined
 * @param accumulator - Running combination applied to the entries
 * @returns Combined value for the requested axis
 */
export default function reduce(
  values: unknown[],
  nan: boolean | number,
  axis: number | undefined,
  accumulator: Types.NumerixReduce
): number | number[] {
  const { skip, target } = nanarg(nan, axis)
  if (!Array.isArray(values[0])) {
    return reduceone(values as number[], skip, accumulator)
  }
  if (target !== undefined) {
    return axreduce(values as number[][], target, skip, accumulator)
  }
  return allreduce(values, skip, accumulator)
}
