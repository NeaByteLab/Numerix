import type * as Types from '@app/types.ts'
import column from '@app/internal/column.ts'
import settle from '@app/internal/settle.ts'

/**
 * Reduce truthiness across an array.
 * @description Combines truthiness along the requested axis.
 * @param values - Values to inspect
 * @param level - Axis along which the results are combined
 * @param policy - Truthiness mode applied to the entries
 * @returns Combined truthiness for the requested axis
 */
export default function truthy(
  values: unknown[],
  level: number | null | undefined,
  policy: Types.NumerixTruthy
): boolean | boolean[] {
  if (level !== undefined && level !== null && Array.isArray(values[0])) {
    if (level !== 1 && level !== -1 && level !== 0 && level !== -2) {
      throw new RangeError('axis is out of bounds for array of dimension 2')
    }
    const matrix = values as unknown[][]
    const height = matrix.length
    const horizontal = level === 1 || level === -1
    const buffer = horizontal ? undefined : new Array<unknown>(height)
    return Array.from(
      { length: horizontal ? height : (matrix[0]?.length ?? 0) },
      (_outer, index) => {
        const slice = horizontal ? (matrix[index] ?? []) : column(matrix, height, index, buffer!, 0)
        for (let cursor = 0; cursor < slice.length; cursor++) {
          const entry = slice[cursor]
          if (
            typeof entry === 'number'
              ? (policy === 'all' ? entry === 0 : entry !== 0)
              : settle(policy, entry)
          ) {
            return policy !== 'all'
          }
        }
        return policy === 'all'
      }
    )
  }
  if (
    !Array.isArray(values[0]) && level !== undefined && level !== null && level !== 0 &&
    level !== -1
  ) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  const queue: unknown[][] = [values]
  while (queue.length > 0) {
    const current = queue.pop()!
    for (let index = 0; index < current.length; index++) {
      const entry = current[index]
      if (Array.isArray(entry)) {
        queue.push(entry)
      } else if (
        typeof entry === 'number'
          ? (policy === 'all' ? entry === 0 : entry !== 0)
          : settle(policy, entry)
      ) {
        return policy !== 'all'
      }
    }
  }
  return policy === 'all'
}
