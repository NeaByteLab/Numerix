import type * as Types from '@app/types.ts'
import shape from '@app/internal/shape.ts'

/**
 * Map a function over nested values.
 * @description Applies a transform or complex promotion to every leaf entry.
 * @template Output - Result element type
 * @param value - Scalar, vector, or matrix input
 * @param apply - Optional transform applied to each leaf entry
 * @returns Transformed values matching the input nesting shape
 */
export default function nested<Output = Types.NumerixComplex>(
  value: unknown,
  apply?: (entry: unknown) => Output
): Output | Output[] | Output[][] {
  if (Array.isArray(value)) {
    return value.map((entry) => nested(entry, apply) as Output) as Output[] | Output[][]
  }
  if (apply) {
    return apply(value)
  }
  if (typeof value === 'number') {
    return { re: value, im: 0 } as unknown as Output
  }
  if (shape(value)) {
    return { re: value.re, im: value.im } as unknown as Output
  }
  return value as Output
}
