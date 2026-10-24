/**
 * Split values into mantissa and exponent.
 * @description Decomposes each value into fraction and power.
 * @param value - Scalar or vector of input values
 * @returns Mantissa and exponent for each input value
 */
export default function frexp(value: number | number[]): [number, number] | [number[], number[]] {
  if (Array.isArray(value)) {
    const length = value.length
    const mantissas = new Array<number>(length)
    const exponents = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      const [mantissa, exponent] = splitScalar(value[index] ?? 0)
      mantissas[index] = mantissa
      exponents[index] = exponent
    }
    return [mantissas, exponents]
  }
  return splitScalar(value)
}

/**
 * Split a scalar into parts.
 * @description Decomposes a value into fraction and power.
 * @param scalar - Value to decompose
 * @returns Mantissa and exponent of the value
 */
function splitScalar(scalar: number): [number, number] {
  if (scalar === 0 || !Number.isFinite(scalar)) {
    return [scalar, 0]
  }
  const magnitude = Math.abs(scalar)
  let exponent = Math.floor(Math.log2(magnitude)) + 1
  let mantissa = scalar / Math.pow(2, exponent)
  if (Math.abs(mantissa) >= 1) {
    mantissa *= 0.5
    exponent += 1
  }
  return [mantissa, exponent]
}
