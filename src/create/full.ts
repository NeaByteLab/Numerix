import type * as Types from '@app/types.ts'
import * as Dtype from '@app/dtype/index.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Create a filled array.
 * @description Builds an array of the given shape.
 * @param shape - Dimensions of the created array
 * @param value - Value assigned to every entry
 * @returns Array holding the fill value
 */
export default function full(
  shape: number | number[] | unknown[],
  value: unknown = 0
): unknown {
  let dimensions: number[]
  let chosen = value
  if (typeof shape === 'number') {
    dimensions = [shape]
  } else if (
    Array.isArray(shape) &&
    (shape.length === 0 || shape.every((entry) => typeof entry === 'number'))
  ) {
    dimensions = shape as number[]
  } else {
    dimensions = Dtype.info(shape).shape
    if (Internal.classify(shape, true, true) === true && typeof chosen === 'number') {
      chosen = { re: chosen, im: 0 }
    }
  }
  if (dimensions.length === 0) {
    return []
  }
  const length = dimensions[0] ?? 0
  for (let index = 0; index < dimensions.length; index++) {
    if ((dimensions[index] ?? 0) < 0) {
      throw new RangeError('negative dimensions are not allowed')
    }
  }
  if (dimensions.length === 1) {
    if (Internal.shape(chosen)) {
      return Array.from(
        { length },
        () => ({ re: (chosen as Types.NumerixComplex).re, im: (chosen as Types.NumerixComplex).im })
      )
    }
    return new Array(length).fill(chosen)
  }
  return Array.from({ length }, () => full(dimensions.slice(1), chosen))
}
