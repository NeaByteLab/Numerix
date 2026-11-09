import * as Internal from '@app/internal/index.ts'

/**
 * Split a matrix into mantissa and exponent.
 * @description Decomposes each matrix entry into fraction and power.
 * @param value - Matrix of input values
 * @returns Mantissa and exponent matrices
 */
export default function frexp(
  value: number[][]
): [number[][], number[][]]
/**
 * Split a vector into mantissa and exponent.
 * @description Decomposes each vector entry into fraction and power.
 * @param value - Vector of input values
 * @returns Mantissa and exponent vectors
 */
export default function frexp(
  value: number[]
): [number[], number[]]
/**
 * Split a scalar into mantissa and exponent.
 * @description Decomposes a scalar value into fraction and power.
 * @param value - Scalar input value
 * @returns Mantissa and exponent pair
 */
export default function frexp(
  value: number
): [number, number]
/**
 * Split values into mantissa and exponent.
 * @description Decomposes each value into fraction and power.
 * @param value - Scalar, vector, or matrix of input values
 * @returns Mantissa and exponent for each input value
 */
export default function frexp(
  value: number | number[] | number[][]
): [number, number] | [number[], number[]] | [number[][], number[][]] {
  if (typeof value === 'number') {
    if (value === 0 || !Number.isFinite(value)) {
      return [value, 0]
    }
    Internal.bits.float[0] = Math.abs(value)
    let offset = 0
    if (((Internal.bits.uint[0] ?? 0n) >> 52n) === 0n) {
      Internal.bits.float[0] *= 2 ** 54
      offset = 54
    }
    const pattern = Internal.bits.uint[0] ?? 0n
    Internal.bits.uint[0] = (pattern & 0x800fffffffffffffn) | 0x3fe0000000000000n
    return [
      Math.sign(value) * (Internal.bits.float[0] ?? 0),
      (Number(pattern >> 52n) - 1022) - offset
    ]
  }
  if (!Array.isArray(value[0])) {
    const vector = value as number[]
    const length = vector.length
    const mantissas = new Array<number>(length)
    const exponents = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      const scalar = Number(vector[index] ?? 0)
      if (scalar === 0 || !Number.isFinite(scalar)) {
        mantissas[index] = scalar
        exponents[index] = 0
        continue
      }
      Internal.bits.float[0] = Math.abs(scalar)
      let offset = 0
      if (((Internal.bits.uint[0] ?? 0n) >> 52n) === 0n) {
        Internal.bits.float[0] *= 2 ** 54
        offset = 54
      }
      const pattern = Internal.bits.uint[0] ?? 0n
      exponents[index] = (Number(pattern >> 52n) - 1022) - offset
      Internal.bits.uint[0] = (pattern & 0x800fffffffffffffn) | 0x3fe0000000000000n
      mantissas[index] = Math.sign(scalar) * (Internal.bits.float[0] ?? 0)
    }
    return [mantissas, exponents]
  }
  const matrix = value as number[][]
  const height = matrix.length
  const mantissas = new Array<number[]>(height)
  const exponents = new Array<number[]>(height)
  for (let outer = 0; outer < height; outer++) {
    const [fractions, powers] = frexp(matrix[outer] ?? [])
    mantissas[outer] = fractions
    exponents[outer] = powers
  }
  return [mantissas, exponents]
}
