/**
 * Coerce an input into a matrix.
 * @description Wraps a vector into a single row matrix.
 * @param input - Vector or matrix to coerce
 * @returns Matrix form of the input
 */
function asMatrix(input: number[] | number[][]): number[][] {
  if (Array.isArray(input[0])) {
    return input as number[][]
  }
  return [input as number[]]
}

/**
 * Compute the Kronecker product of matrices.
 * @description Builds a block matrix from scaled copies.
 * @param left - First matrix of the product
 * @param right - Second matrix of the product
 * @returns Kronecker product of the two inputs
 */
export default function kron(
  left: number[] | number[][],
  right: number[] | number[][]
): number[] | number[][] {
  const source = asMatrix(left)
  const target = asMatrix(right)
  const sourceHeight = source.length
  const sourceWidth = source[0]?.length ?? 0
  const targetHeight = target.length
  const targetWidth = target[0]?.length ?? 0
  const rows = sourceHeight * targetHeight
  const columns = sourceWidth * targetWidth
  const result = new Array<number[]>(rows)
  for (let index = 0; index < sourceHeight; index++) {
    const line = source[index] ?? []
    for (let row = 0; row < targetHeight; row++) {
      const block = target[row] ?? []
      const output = new Array<number>(columns)
      for (let column = 0; column < sourceWidth; column++) {
        const scale = line[column] ?? 0
        const base = column * targetWidth
        for (let offset = 0; offset < targetWidth; offset++) {
          output[base + offset] = scale * (block[offset] ?? 0)
        }
      }
      result[index * targetHeight + row] = output
    }
  }
  return sourceHeight === 1 && targetHeight === 1 ? (result[0] ?? []) : result
}
