import type * as Types from '@app/types.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Pack bits into bytes.
 * @description Groups bits into bytes using the requested order.
 * @param values - Bit values to pack
 * @param order - Byte order used for packing
 * @param level - Optional axis along which to pack two-dimensional matrices
 * @returns Packed byte values
 */
export default function pack(
  values: number[],
  order?: Types.NumerixOrder | number | null,
  level?: number | null | Types.NumerixOrder
): number[]
/**
 * Pack bit rows into bytes.
 * @description Flattens the matrix when the axis is null before packing.
 * @param values - Matrix of bit values to pack
 * @param order - Byte order used for packing or null axis
 * @param level - Null axis that flattens the matrix before packing, or byte order
 * @returns Flat array of packed byte values
 */
export default function pack(
  values: number[][],
  order: Types.NumerixOrder | null | undefined,
  level?: null | Types.NumerixOrder
): number[]
/**
 * Pack bit rows into bytes.
 * @description Groups each row or column of bits into bytes.
 * @param values - Matrix of bit values to pack
 * @param order - Byte order used for packing or axis
 * @param level - Axis along which to pack or byte order
 * @returns Matrix of packed byte values
 */
export default function pack(
  values: number[][],
  order?: Types.NumerixOrder | number,
  level?: number | Types.NumerixOrder
): number[][]
/**
 * Pack bits into bytes.
 * @description Groups bits into bytes using the requested order.
 * @param values - Bit values or matrix to pack
 * @param order - Byte order used for packing or axis
 * @param level - Axis along which to pack or byte order
 * @returns Packed byte values
 */
export default function pack(
  values: number[] | number[][],
  order?: Types.NumerixOrder | number | null,
  level?: number | null | Types.NumerixOrder
): number[] | number[][] {
  if (
    (typeof order === 'string' && order !== 'big' && order !== 'little') ||
    (typeof level === 'string' && level !== 'big' && level !== 'little')
  ) {
    throw new TypeError("'order' must be either 'little' or 'big'")
  }
  const chosen: number | null | undefined = typeof order === 'number' || order === null
    ? order
    : typeof level === 'number' || level === null
    ? level
    : undefined
  const vector = !Array.isArray(values[0])
  const little =
    (typeof order === 'string' ? order : typeof level === 'string' ? level : 'big') === 'little'
  if (!vector && chosen === null) {
    return pack(Shape.flatten<number>(values as number[][]), little ? 'little' : 'big', 0)
  }
  const dimensions = vector ? 1 : 2
  const resolved = chosen === undefined || chosen === null
    ? 1
    : chosen < 0
    ? dimensions + chosen
    : chosen
  if (chosen !== undefined && chosen !== null && (resolved < 0 || resolved >= dimensions)) {
    throw new RangeError(`axis is out of bounds for array of dimension ${dimensions}`)
  }
  if (!vector) {
    const matrix = values as number[][]
    if (resolved === 1) {
      return matrix.map((slice) => pack(slice ?? [], order, 0) as number[])
    }
    const width = matrix[0]?.length ?? 0
    const blocks = Math.ceil(matrix.length / 8)
    if (width === 0) {
      return Array.from({ length: blocks }, () => [])
    }
    return Array.from({ length: blocks }, (_outer, index) => {
      const start = index << 3
      const slice = new Array<number>(width)
      for (let column = 0; column < width; column++) {
        let value = 0
        for (let offset = 0; offset < 8; offset++) {
          if (matrix[start + offset]?.[column]) {
            value |= little ? 1 << offset : 1 << (7 - offset)
          }
        }
        slice[column] = value
      }
      return slice
    })
  }
  return Array.from({ length: Math.ceil(values.length / 8) }, (_outer, index) => {
    const start = index << 3
    let value = 0
    for (let offset = 0; offset < 8; offset++) {
      if ((values as number[])[start + offset]) {
        value |= little ? 1 << offset : 1 << (7 - offset)
      }
    }
    return value
  })
}
