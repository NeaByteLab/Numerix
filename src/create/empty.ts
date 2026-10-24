import full from '@app/create/full.ts'

/**
 * Create an array filled with zeros.
 * @description Builds a zero filled array of the given shape.
 * @param shape - Dimensions of the created array
 * @returns Array holding zero values
 */
export default function empty(shape: number | number[] | unknown[]): unknown {
  return full(shape, 0)
}
