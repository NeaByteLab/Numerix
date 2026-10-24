import * as Shape from '@app/shape/index.ts'

/**
 * Compute differences between adjacent elements.
 * @description Repeats finite differencing to reach the requested order.
 * @param values - Vector or matrix of input values
 * @param order - Number of differencing passes to apply
 * @param axis - Axis along which differences are computed
 * @returns Differences matching the shape of the input
 */
export default function diff(
  values: number[] | number[][],
  order = 1,
  axis: number | 'flat' = -1
): number[] | number[][] {
  if (Array.isArray(values[0])) {
    if (axis === 'flat') {
      return diff1D(Shape.flatten<number>(values), order)
    }
    const matrix = values as number[][]
    const rows = matrix.length
    if (axis === 0) {
      if (order >= rows) {
        return []
      }
      const width = matrix[0]?.length ?? 0
      const count = rows - order
      const result = new Array<number[]>(count)
      const buffer = new Array<number>(rows)
      for (let row = 0; row < count; row++) {
        result[row] = new Array<number>(width)
      }
      for (let column = 0; column < width; column++) {
        for (let row = 0; row < rows; row++) {
          buffer[row] = matrix[row]?.[column] ?? 0
        }
        const line = diff1D(buffer, order)
        for (let row = 0; row < count; row++) {
          result[row]![column] = line[row] ?? 0
        }
      }
      return result
    }
    const result = new Array<number[]>(rows)
    for (let row = 0; row < rows; row++) {
      result[row] = diff1D(matrix[row] ?? [], order)
    }
    return result
  }
  return diff1D(values as number[], order)
}

/**
 * Difference a flat vector.
 * @description Repeats differencing to reach the requested order.
 * @param values - Vector to difference
 * @param order - Number of differencing passes to apply
 * @returns Vector of differences
 */
function diff1D(values: number[], order: number): number[] {
  const length = values.length
  if (order <= 0) {
    return values.slice()
  }
  if (order >= length) {
    return []
  }
  if (order === 1) {
    const total = length - 1
    const result = new Array<number>(total)
    for (let index = 0; index < total; index++) {
      result[index] = (values[index + 1] ?? 0) - (values[index] ?? 0)
    }
    return result
  }
  const result = values.slice()
  for (let step = 0; step < order; step++) {
    const width = length - 1 - step
    for (let index = 0; index < width; index++) {
      result[index] = (result[index + 1] ?? 0) - (result[index] ?? 0)
    }
  }
  result.length = length - order
  return result
}
