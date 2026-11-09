/**
 * Split matrix values into two parts.
 * @description Separates each matrix entry into whole and fractional portions.
 * @param value - Matrix of input values
 * @returns Fractional and integral part matrices
 */
export default function modf(
  value: number[][]
): [number[][], number[][]]
/**
 * Split vector values into two parts.
 * @description Separates each vector entry into whole and fractional portions.
 * @param value - Vector of input values
 * @returns Fractional and integral part vectors
 */
export default function modf(
  value: number[]
): [number[], number[]]
/**
 * Split a scalar value into two parts.
 * @description Separates a scalar value into whole and fractional portions.
 * @param value - Scalar input value
 * @returns Fractional and integral part pair
 */
export default function modf(
  value: number
): [number, number]
/**
 * Split values into two parts.
 * @description Separates each value into its whole and fractional portions.
 * @param value - Scalar, vector, or matrix of input values
 * @returns Fractional and integral parts for each input value
 */
export default function modf(
  value: number | number[] | number[][]
): [number, number] | [number[], number[]] | [number[][], number[][]] {
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      return [NaN, NaN]
    }
    if (!Number.isFinite(value)) {
      return [value < 0 ? -0 : 0, value]
    }
    const integral = Math.trunc(value)
    const residue = value - integral
    return [residue === 0 && (value < 0 || Object.is(value, -0)) ? -0 : residue, integral]
  }
  if (!Array.isArray(value[0])) {
    const vector = value as number[]
    const length = vector.length
    const fractions = new Array<number>(length)
    const integrals = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      const scalar = Number(vector[index] ?? 0)
      if (Number.isNaN(scalar)) {
        fractions[index] = NaN
        integrals[index] = NaN
        continue
      }
      if (!Number.isFinite(scalar)) {
        fractions[index] = scalar < 0 ? -0 : 0
        integrals[index] = scalar
        continue
      }
      const integral = Math.trunc(scalar)
      const residue = scalar - integral
      fractions[index] = residue === 0 && (scalar < 0 || Object.is(scalar, -0)) ? -0 : residue
      integrals[index] = integral
    }
    return [fractions, integrals]
  }
  const matrix = value as number[][]
  const height = matrix.length
  const fractions = new Array<number[]>(height)
  const integrals = new Array<number[]>(height)
  for (let outer = 0; outer < height; outer++) {
    const [residues, wholes] = modf(matrix[outer] ?? [])
    fractions[outer] = residues
    integrals[outer] = wholes
  }
  return [fractions, integrals]
}
