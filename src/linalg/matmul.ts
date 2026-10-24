/**
 * Multiply two matrices.
 * @description Contracts the inner dimension of both operands.
 * @param left - First matrix of the product
 * @param right - Second matrix of the product
 * @returns Matrix product of the two inputs
 */
export default function matmul(left: number[][], right: number[][]): number[][] {
  const rows = left.length
  const depth = right.length
  const columns = right[0]?.length ?? 0
  const lines = new Array<Float64Array>(depth)
  for (let inner = 0; inner < depth; inner++) {
    lines[inner] = Float64Array.from(right[inner] ?? [])
  }
  const result = new Array<number[]>(rows)
  for (let row = 0; row < rows; row++) {
    const output = new Array<number>(columns).fill(0)
    const source = left[row] ?? []
    let inner = 0
    const limit = depth - 3
    for (; inner < limit; inner += 4) {
      const first = source[inner] ?? 0
      const second = source[inner + 1] ?? 0
      const third = source[inner + 2] ?? 0
      const fourth = source[inner + 3] ?? 0
      if (first === 0 && second === 0 && third === 0 && fourth === 0) {
        continue
      }
      const block: Float64Array[] = [
        lines[inner] as Float64Array,
        lines[inner + 1] as Float64Array,
        lines[inner + 2] as Float64Array,
        lines[inner + 3] as Float64Array
      ]
      for (let column = 0; column < columns; column++) {
        output[column] = (output[column] ?? 0) +
          first * (block[0]?.[column] ?? 0) +
          second * (block[1]?.[column] ?? 0) +
          third * (block[2]?.[column] ?? 0) +
          fourth * (block[3]?.[column] ?? 0)
      }
    }
    for (; inner < depth; inner++) {
      const factor = source[inner] ?? 0
      if (factor === 0) {
        continue
      }
      const line = lines[inner] as Float64Array
      for (let column = 0; column < columns; column++) {
        output[column] = (output[column] ?? 0) + factor * (line[column] ?? 0)
      }
    }
    result[row] = output
  }
  return result
}
