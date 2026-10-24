import * as Shape from '@app/shape/index.ts'

/**
 * Compute the outer product of vectors.
 * @description Multiplies every entry of one vector by the other.
 * @param left - First vector of the product
 * @param right - Second vector of the product
 * @returns Outer product matrix of the two inputs
 */
export default function outer(left: number[], right: number[]): number[][] {
  const source = Array.isArray(left[0]) ? Shape.flatten<number>(left) : left
  const target = Array.isArray(right[0]) ? Shape.flatten<number>(right) : right
  const rows = source.length
  const columns = target.length
  const result = new Array<number[]>(rows)
  for (let row = 0; row < rows; row++) {
    const factor = source[row] ?? 0
    const output = new Array<number>(columns)
    for (let column = 0; column < columns; column++) {
      output[column] = factor * (target[column] as number)
    }
    result[row] = output
  }
  return result
}
