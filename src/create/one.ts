import full from '@app/create/full.ts'

/**
 * Create an array filled with ones.
 * @description Builds a one filled array of the given shape.
 * @param shape - Dimensions of the created array
 * @returns Array holding unit values
 */
export default function one(shape: number | number[] | unknown[]): unknown {
  return full(shape, 1)
}
