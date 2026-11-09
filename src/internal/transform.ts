import type * as Types from '@app/types.ts'
import axes from '@app/internal/axes.ts'
import columns from '@app/internal/columns.ts'
import rows from '@app/internal/rows.ts'

/**
 * Apply a transform along one axis.
 * @description Runs the transform over the selected direction.
 * @template T - Element type of the transformed grid
 * @param input - Rows to transform
 * @param level - Axis selection to apply
 * @param apply - Transform applied to each transformed line
 * @returns Transformed grid
 */
export default function transform<T = Types.NumerixComplex>(
  input: (Types.NumerixComplex | number)[][],
  level: Types.NumerixAxis | undefined,
  apply: (outer: (Types.NumerixComplex | number)[]) => T[]
): T[][] {
  const direction = axes(level)
  if (direction === 'columns') {
    return columns(input, apply)
  }
  return direction === 'all'
    ? columns(rows(input, apply) as unknown as (Types.NumerixComplex | number)[][], apply)
    : rows(input, apply)
}
