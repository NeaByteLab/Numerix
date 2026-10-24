import type * as Types from '@app/types.ts'

/**
 * Report the transform direction.
 * @description Treats an absent selection as the trailing axis.
 * @param axis - Axis selection to inspect
 * @returns Direction the transform runs along
 */
export default function axes(
  axis: Types.NumerixAxis | undefined
): Types.NumerixTransform {
  if (axis === 'all') {
    return 'all'
  }
  if (Array.isArray(axis)) {
    return axis.length === 2 ? 'all' : 'rows'
  }
  if (axis === 0 || axis === -2) {
    return 'columns'
  }
  return 'rows'
}
