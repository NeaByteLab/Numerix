import type * as Types from '@app/types.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Unpack bytes into bits.
 * @description Expands each byte into its individual bits.
 * @param bytes - Byte values to unpack
 * @param order - Byte order or bit count limit
 * @param count - Optional maximum number of unpacked bits
 * @param level - Optional axis along which to unpack two-dimensional matrices
 * @returns Bit values for every byte
 */
export default function unpack(
  bytes: number[],
  order?: Types.NumerixOrder | number,
  count?: number | Types.NumerixOrder,
  level?: number | null
): number[]
/**
 * Unpack byte rows into bits.
 * @description Flattens the matrix when the axis is null before unpacking.
 * @param bytes - Matrix of byte values to unpack
 * @param order - Byte order or bit count limit
 * @param count - Optional maximum number of unpacked bits or byte order
 * @param level - Null axis that flattens the matrix before unpacking
 * @returns Flat array of unpacked bit values
 */
export default function unpack(
  bytes: number[][],
  order: Types.NumerixOrder | number | undefined,
  count: number | Types.NumerixOrder | undefined,
  level: null
): number[]
/**
 * Unpack byte rows into bits.
 * @description Expands each row or column of bytes into bits.
 * @param bytes - Matrix of byte values to unpack
 * @param order - Byte order or bit count limit
 * @param count - Optional maximum number of unpacked bits or byte order
 * @param level - Axis along which to unpack
 * @returns Matrix of unpacked bit values
 */
export default function unpack(
  bytes: number[][],
  order?: Types.NumerixOrder | number,
  count?: number | Types.NumerixOrder,
  level?: number
): number[][]
/**
 * Unpack bytes into bits.
 * @description Expands each byte into its individual bits.
 * @param bytes - Byte values or matrix to unpack
 * @param order - Byte order or bit count limit
 * @param count - Optional maximum number of unpacked bits or byte order
 * @param level - Axis along which to unpack
 * @returns Bit values for every byte
 */
export default function unpack(
  bytes: number[] | number[][],
  order?: Types.NumerixOrder | number,
  count?: number | Types.NumerixOrder,
  level?: number | null
): number[] | number[][] {
  if (
    (typeof order === 'string' && order !== 'big' && order !== 'little') ||
    (typeof count === 'string' && count !== 'big' && count !== 'little')
  ) {
    throw new TypeError("'order' must be either 'little' or 'big'")
  }
  const maximum = typeof order === 'number' ? order : typeof count === 'number' ? count : undefined
  const vector = !Array.isArray(bytes[0])
  if (!vector && level === null) {
    return unpack(Shape.flatten<number>(bytes as number[][]), order, count, 0)
  }
  const dimensions = vector ? 1 : 2
  const resolved = level === undefined || level === null
    ? 1
    : level < 0
    ? dimensions + level
    : level
  if (level !== undefined && level !== null && (resolved < 0 || resolved >= dimensions)) {
    throw new RangeError(`axis is out of bounds for array of dimension ${dimensions}`)
  }
  const little =
    (typeof order === 'string' ? order : typeof count === 'string' ? count : 'big') === 'little'
  if (!vector) {
    const matrix = bytes as number[][]
    if (resolved === 1) {
      return matrix.map((slice) => unpack(slice ?? [], order, count, 0) as number[])
    }
    const total = matrix.length << 3
    if (maximum !== undefined && maximum < 0 && total + maximum < 0) {
      throw new RangeError('-count larger than number of elements')
    }
    const depth = maximum === undefined ? total : maximum < 0 ? total + maximum : maximum
    const width = matrix[0]?.length ?? 0
    if (width === 0) {
      return Array.from({ length: depth }, () => [])
    }
    return Array.from({ length: depth }, (_outer, offset) => {
      if (offset >= total) {
        return new Array<number>(width).fill(0)
      }
      const source = matrix[offset >> 3] ?? []
      const shift = little ? offset & 7 : 7 - (offset & 7)
      return Array.from({ length: width }, (_inner, column) => ((source[column] ?? 0) >> shift) & 1)
    })
  }
  const total = bytes.length << 3
  if (maximum !== undefined && maximum < 0 && total + maximum < 0) {
    throw new RangeError('-count larger than number of elements')
  }
  return Array.from(
    { length: maximum === undefined ? total : maximum < 0 ? total + maximum : maximum },
    (_outer, offset) =>
      offset < total
        ? ((((bytes as number[])[offset >> 3] ?? 0) >> (little ? offset & 7 : 7 - (offset & 7))) &
          1)
        : 0
  )
}
