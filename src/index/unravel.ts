/**
 * Convert a flat index to coordinates.
 * @description Computes the position of an offset along each axis.
 * @param index - Flat offset to convert
 * @param dimensions - Length of each axis
 * @param order - Memory layout order, row-major or column-major
 * @returns Coordinate along each axis
 */
export default function unravel(
  index: number,
  dimensions: number[],
  order?: 'C' | 'F'
): number[]
/**
 * Convert flat indices to coordinates.
 * @description Computes per-axis coordinates for an array of offsets.
 * @param index - Array of flat offsets to convert
 * @param dimensions - Length of each axis
 * @param order - Memory layout order, row-major or column-major
 * @returns Coordinates along each axis
 */
export default function unravel(
  index: number[],
  dimensions: number[],
  order?: 'C' | 'F'
): number[][]
/**
 * Convert two-dimensional flat indices to coordinates.
 * @description Computes per-axis two-dimensional coordinates for a matrix of offsets.
 * @param index - Two-dimensional matrix of flat offsets to convert
 * @param dimensions - Length of each axis
 * @param order - Memory layout order, row-major or column-major
 * @returns Two-dimensional coordinates along each axis
 */
export default function unravel(
  index: number[][],
  dimensions: number[],
  order?: 'C' | 'F'
): number[][][]
/**
 * Convert flat indices to coordinates.
 * @description Computes the position of an offset along each axis.
 * @param index - Flat offset or array of offsets to convert
 * @param dimensions - Length of each axis
 * @param order - Memory layout order, row-major or column-major
 * @returns Coordinate along each axis
 */
export default function unravel(
  index: number | number[] | number[][],
  dimensions: number[],
  order: 'C' | 'F' = 'C'
): number[] | number[][] | number[][][] {
  if (order !== 'C' && order !== 'F') {
    throw new RangeError("order must be one of 'C' or 'F'")
  }
  const strides = new Array<number>(dimensions.length)
  let total = 1
  for (
    let level = order === 'F' ? 0 : dimensions.length - 1;
    order === 'F' ? level < dimensions.length : level >= 0;
    level += order === 'F' ? 1 : -1
  ) {
    const extent = dimensions[level] ?? 1
    if (extent < 0) {
      throw new RangeError('dimensions must be positive')
    }
    strides[level] = total
    total *= extent
  }
  if (!Array.isArray(index)) {
    if (!Number.isInteger(index) || index < 0 || index >= total) {
      throw new RangeError('index is out of bounds for array with size ' + total)
    }
    return dimensions.map((extent, level) =>
      Math.floor(index / (strides[level] ?? 1)) % (extent || 1)
    )
  }
  if (!Array.isArray(index[0])) {
    const items = index as number[]
    for (let cursor = 0; cursor < items.length; cursor++) {
      const entry = items[cursor] ?? 0
      if (!Number.isInteger(entry) || entry < 0 || entry >= total) {
        throw new RangeError('index is out of bounds for array with size ' + total)
      }
    }
    return dimensions.map((extent, level) => {
      const stride = strides[level] ?? 1
      const divisor = extent || 1
      return items.map((entry) => Math.floor((entry ?? 0) / stride) % divisor)
    })
  }
  const matrix = index as number[][]
  for (let outer = 0; outer < matrix.length; outer++) {
    const slice = matrix[outer] ?? []
    for (let column = 0; column < slice.length; column++) {
      const entry = slice[column] ?? 0
      if (!Number.isInteger(entry) || entry < 0 || entry >= total) {
        throw new RangeError('index is out of bounds for array with size ' + total)
      }
    }
  }
  return dimensions.map((extent, level) => {
    const stride = strides[level] ?? 1
    const divisor = extent || 1
    return matrix.map((slice) =>
      (slice ?? []).map((entry) => Math.floor((entry ?? 0) / stride) % divisor)
    )
  })
}
