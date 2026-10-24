import type * as Types from '@app/types.ts'
import axes from '@app/internal/axes.ts'
import columns from '@app/internal/columns.ts'
import matrix from '@app/internal/matrix.ts'
import rows from '@app/internal/rows.ts'

/**
 * Apply a transform along one axis.
 * @description Runs the transform over the selected direction.
 * @param grid - Rows to transform
 * @param axis - Axis selection to apply
 * @param apply - Transform applied to each transformed line
 * @returns Transformed grid
 */
export default function transform(
  grid: (Types.NumerixComplex | number)[][],
  axis: Types.NumerixAxis | undefined,
  apply: (line: (Types.NumerixComplex | number)[]) => Types.NumerixComplex[]
): Types.NumerixComplex[][] {
  const direction = axes(axis)
  if (direction === 'all') {
    return matrix(grid, apply, apply)
  }
  if (direction === 'columns') {
    return columns(grid, apply)
  }
  return rows(grid, apply)
}
