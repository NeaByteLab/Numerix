import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Extract a matrix diagonal.
 * @description Reads or writes entries along the diagonal.
 * @param input - Vector or matrix to read from
 * @param offset - Diagonal offset used for the extraction
 * @param flat - When true treats the input as a flat vector
 * @returns Diagonal entries or matrix holding them
 */
export default function diag(
  input: number[] | number[][],
  offset = 0,
  flat = false
): number[] | number[][] {
  if (Array.isArray(input[0]) && !flat) {
    const matrix = input as number[][]
    return Internal.diagonal<number>(matrix, offset, 0)
  }
  const vector = Array.isArray(input[0]) ? Shape.flatten<number>(input) : (input as number[])
  const length = vector.length
  const order = length + Math.abs(offset)
  const matrix = new Array<number[]>(order)
  for (let row = 0; row < order; row++) {
    matrix[row] = new Array<number>(order).fill(0)
  }
  const rowStart = offset < 0 ? -offset : 0
  const columnStart = offset > 0 ? offset : 0
  for (let index = 0; index < length; index++) {
    const current = matrix[index + rowStart]
    if (current) {
      current[index + columnStart] = vector[index] ?? 0
    }
  }
  return matrix
}
