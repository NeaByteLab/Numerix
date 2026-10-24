import type * as Types from '@app/types.ts'

/**
 * Map a function over complex values.
 * @description Applies a transform to each entry.
 * @param value - Complex or real values to transform
 * @param apply - Transform applied to each entry
 * @returns Transformed values matching the input nesting shape
 * @template R - Result element type
 */
export default function traverse<R>(
  value: Types.NumerixValue,
  apply: (entry: Types.NumerixComplex | number) => R
): R | R[] | R[][] {
  if (Array.isArray(value)) {
    const length = value.length
    const result = new Array<R>(length)
    for (let index = 0; index < length; index++) {
      result[index] = traverse(value[index] as Types.NumerixValue, apply) as R
    }
    return result as R[] | R[][]
  }
  return apply(value)
}
