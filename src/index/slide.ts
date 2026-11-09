import * as Internal from '@app/internal/index.ts'

/**
 * Extract sliding windows from a matrix.
 * @description Collects overlapping one-dimensional windows along a matrix axis.
 * @template T - Type of the matrix values
 * @param input - Matrix from which the windows are taken
 * @param window - Number of entries in each window along the axis
 * @param spacing - Distance between consecutive windows
 * @param level - Axis along which the window slides
 * @returns Three-dimensional array of extracted windows
 */
export default function slide<T = number>(
  input: T[][],
  window: number | number[],
  spacing: number | undefined,
  level: number
): T[][][]
/**
 * Extract sliding windows from a matrix.
 * @description Collects overlapping two-dimensional windows of the requested shape.
 * @template T - Type of the matrix values
 * @param input - Matrix from which the windows are taken
 * @param window - Window dimensions along rows and columns
 * @param spacing - Distance between consecutive windows
 * @param level - Optional axis when the window is a scalar
 * @returns Grid of extracted two-dimensional windows
 */
export default function slide<T = number>(
  input: T[][],
  window: [number, number] | number[],
  spacing?: number | [number, number],
  level?: number
): T[][][][]
/**
 * Extract sliding windows from a vector.
 * @description Collects overlapping one-dimensional windows of the given length.
 * @template T - Type of the vector values
 * @param input - Vector from which the windows are taken
 * @param window - Number of entries in each window
 * @param spacing - Distance between consecutive windows
 * @param level - Optional axis along which the window slides
 * @returns Array of extracted windows
 */
export default function slide<T = number>(
  input: T[],
  window: number,
  spacing?: number,
  level?: number
): T[][]
/**
 * Extract sliding windows from an array.
 * @description Collects overlapping windows of the requested shape.
 * @template T - Type of the array values
 * @param input - Array or matrix from which the windows are taken
 * @param window - Number of entries in each window or a two-dimensional window shape
 * @param spacing - Distance between consecutive windows
 * @param level - Optional axis when sliding a one-dimensional window over a two-dimensional matrix
 * @returns Array of extracted windows
 */
export default function slide<T = number>(
  input: T[] | T[][],
  window: number | [number, number] | number[],
  spacing: number | [number, number] = 1,
  level?: number
): T[][] | T[][][] | T[][][][] {
  if (!Array.isArray(input[0])) {
    if (level !== undefined && level !== 0 && level !== -1) {
      throw new RangeError('axis out of bounds')
    }
    if (Array.isArray(window) && window.length !== 1) {
      throw new RangeError('window_shape must provide a length for every dimension')
    }
    const extent = typeof window === 'number' ? window : (window[0] ?? 0)
    const stride = typeof spacing === 'number' ? spacing : (spacing[0] ?? 1)
    if (extent < 0) {
      throw new RangeError('window_shape cannot contain negative values')
    }
    if (extent > input.length) {
      throw new RangeError('window shape cannot be larger than input array shape')
    }
    if (stride <= 0) {
      return []
    }
    const output = Array.from(
      { length: Math.floor((input.length - extent) / stride) + 1 },
      (_outer, outer) => (input as T[]).slice(outer * stride, outer * stride + extent)
    )
    return Internal.classify(input, true, true) === true
      ? (Internal.nested(output) as unknown as T[][])
      : output
  }
  const matrix = input as T[][]
  if (level !== undefined) {
    if (Array.isArray(window) && window.length !== 1) {
      throw new RangeError('window_shape and axis must have the same length')
    }
    const extent = typeof window === 'number' ? window : (window[0] ?? 0)
    const stride = typeof spacing === 'number' ? spacing : (spacing[0] ?? 1)
    const resolved = level < 0 ? 2 + level : level
    if (resolved !== 0 && resolved !== 1) {
      throw new RangeError('axis out of bounds')
    }
    if (resolved === 1) {
      return matrix.map((outer) => slide(outer ?? [], extent, stride))
    }
    if (extent < 0) {
      throw new RangeError('window_shape cannot contain negative values')
    }
    if (extent > matrix.length) {
      throw new RangeError('window shape cannot be larger than input array shape')
    }
    if (stride <= 0) {
      return []
    }
    const width = matrix[0]?.length ?? 0
    const output = Array.from(
      { length: Math.floor((matrix.length - extent) / stride) + 1 },
      (_outer, outer) => {
        const origin = outer * stride
        return Array.from(
          { length: width },
          (_column, column) =>
            Array.from(
              { length: extent },
              (_offset, offset) => matrix[origin + offset]?.[column] as T
            )
        )
      }
    )
    return Internal.classify(input, true, true) === true
      ? (Internal.nested(output) as unknown as T[][][])
      : output
  }
  if (!Array.isArray(window) || window.length !== 2) {
    throw new RangeError('window_shape must provide a length for every dimension')
  }
  const width = matrix[0]?.length ?? 0
  const depth = window[0] ?? 0
  const breadth = window[1] ?? 0
  const vertical = Array.isArray(spacing) ? (spacing[0] ?? 1) : spacing
  const lateral = Array.isArray(spacing) ? (spacing[1] ?? 1) : spacing
  if (depth < 0 || breadth < 0) {
    throw new RangeError('window_shape cannot contain negative values')
  }
  if (depth > matrix.length || breadth > width) {
    throw new RangeError('window shape cannot be larger than input array shape')
  }
  if (vertical <= 0 || lateral <= 0) {
    return []
  }
  const output = Array.from(
    { length: Math.floor((matrix.length - depth) / vertical) + 1 },
    (_outer, outer) => {
      const origin = outer * vertical
      return Array.from(
        { length: Math.floor((width - breadth) / lateral) + 1 },
        (_column, column) => {
          const start = column * lateral
          return Array.from(
            { length: depth },
            (_offset, offset) => (matrix[origin + offset] ?? []).slice(start, start + breadth)
          )
        }
      )
    }
  )
  return Internal.classify(input, true, true) === true
    ? (Internal.nested(output) as unknown as T[][] | T[][][] | T[][][][])
    : output
}
