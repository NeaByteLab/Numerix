import type * as Types from '@app/types.ts'
import settle from '@app/internal/settle.ts'
import witness from '@app/internal/witness.ts'

/**
 * Reduce truthiness across an array.
 * @description Combines truthiness along the requested axis.
 * @param values - Values to inspect
 * @param axis - Axis along which the results are combined
 * @param mode - Truthiness mode applied to the entries
 * @returns Combined truthiness for the requested axis
 */
export default function truthy(
  values: unknown[],
  axis: number | undefined,
  mode: Types.NumerixTruthy
): boolean | boolean[] {
  const invert = mode === 'all'
  if (axis !== undefined && Array.isArray(values[0])) {
    const matrix = values as unknown[][]
    const rows = matrix.length
    if (axis === 1 || axis === -1) {
      const result = new Array<boolean>(rows)
      for (let row = 0; row < rows; row++) {
        const found = witness(matrix[row] ?? [], mode)
        result[row] = invert ? !found : found
      }
      return result
    }
    if (axis === 0 || axis === -2) {
      const columns = matrix[0]?.length ?? 0
      const result = new Array<boolean>(columns)
      for (let column = 0; column < columns; column++) {
        let found = false
        for (let row = 0; row < rows; row++) {
          if (settle(mode, matrix[row]?.[column])) {
            found = true
            break
          }
        }
        result[column] = invert ? !found : found
      }
      return result
    }
  }
  const found = witness(values, mode)
  return invert ? !found : found
}
