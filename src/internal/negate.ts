/**
 * Negate boolean or numeric values.
 * @description Inverts each element while preserving the nesting shape.
 * @param value - Scalar, vector, or matrix values to negate
 * @returns Negated values matching the input nesting shape
 */
export default function negate(
  value: boolean | number | (boolean | number)[] | (boolean | number)[][]
): boolean | boolean[] | boolean[][] {
  if (Array.isArray(value)) {
    const length = value.length
    const result = new Array<boolean>(length)
    for (let index = 0; index < length; index++) {
      result[index] = negate(value[index] as never) as boolean
    }
    return result as boolean[] | boolean[][]
  }
  return !value
}
