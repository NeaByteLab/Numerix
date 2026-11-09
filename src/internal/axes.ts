import type * as Types from '@app/types.ts'

/**
 * Report the transform direction.
 * @description Treats an absent selection as the trailing axis.
 * @param level - Axis selection to inspect
 * @returns Direction along which the transform runs
 */
export default function axes(
  level: Types.NumerixAxis | Types.NumerixTransform | undefined
): Types.NumerixTransform {
  if (level === 'all') {
    return 'all'
  }
  if (level === 'columns') {
    return 'columns'
  }
  if (level === 'rows' || level === undefined) {
    return 'rows'
  }
  if (Array.isArray(level)) {
    for (let index = 0; index < level.length; index++) {
      const entry = level[index] ?? 0
      const resolved = entry < 0 ? entry + 2 : entry
      if (resolved !== 0 && resolved !== 1) {
        throw new RangeError('axis is out of bounds for array of dimension 2')
      }
    }
    if (level.length === 2) {
      return 'all'
    }
    return level[0] === 0 || level[0] === -2 ? 'columns' : 'rows'
  }
  const resolved = level < 0 ? level + 2 : level
  if (resolved !== 0 && resolved !== 1) {
    throw new RangeError('axis is out of bounds for array of dimension 2')
  }
  return resolved === 0 ? 'columns' : 'rows'
}
