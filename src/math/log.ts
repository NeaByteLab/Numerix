import * as Internal from '@app/internal/index.ts'

/**
 * Compute the logarithm of each element.
 * @description Applies a logarithm variant across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @param base - Logarithm base or natural logarithm variant
 * @returns Logarithms matching the input nesting shape
 */
export default function log(
  value: number | number[] | number[][],
  base: number | 'e' | '1p' = 'e'
): number | number[] | number[][] {
  return Internal.unary(value, (scalar) => {
    if (base === '1p') {
      return Math.log1p(scalar)
    }
    if (base === 'e') {
      return Math.log(scalar)
    }
    if (base === 2) {
      return Math.log2(scalar)
    }
    if (base === 10) {
      return Math.log10(scalar)
    }
    return Math.log(scalar) / Math.log(base)
  })
}
