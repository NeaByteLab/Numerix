/**
 * Split values into two parts.
 * @description Separates each value into its whole and fractional portions.
 * @param value - Scalar or vector of input values
 * @returns Fractional and integral parts for each input value
 */
export default function modf(value: number | number[]): [number, number] | [number[], number[]] {
  if (Array.isArray(value)) {
    const length = value.length
    const fractional = new Array<number>(length)
    const integral = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      const [part, whole] = splitScalar(value[index] ?? 0)
      fractional[index] = part
      integral[index] = whole
    }
    return [fractional, integral]
  }
  return splitScalar(value)
}

/**
 * Split one value into its parts.
 * @description Separates a value into its whole and fractional portions.
 * @param value - Value to split
 * @returns Fractional and integral parts of the value
 */
function splitScalar(value: number): [number, number] {
  if (Number.isNaN(value)) {
    return [NaN, NaN]
  }
  if (value === Infinity) {
    return [0, Infinity]
  }
  if (value === -Infinity) {
    return [-0, -Infinity]
  }
  const integral = Math.trunc(value)
  const fractional = value - integral
  return [fractional === 0 && (value < 0 || Object.is(value, -0)) ? -0 : fractional, integral]
}
