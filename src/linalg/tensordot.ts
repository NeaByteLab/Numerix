import matmul from '@app/linalg/matmul.ts'

/**
 * Contract two matrices along axes.
 * @description Contracts the requested axes of both operands.
 * @param left - First operand of the contraction
 * @param right - Second operand of the contraction
 * @param axes - Number of axes contracted on each operand
 * @returns Contracted scalar or matrix
 */
export default function tensordot(
  left: number[][],
  right: number[][],
  axes = 1
): number | number[][] {
  if (axes === 0) {
    const rows = right.length
    const columns = right[0]?.length ?? 0
    const length = rows * columns
    const flat = new Array<number>(length)
    let cursor = 0
    for (let row = 0; row < rows; row++) {
      const current = right[row] ?? []
      for (let column = 0; column < columns; column++) {
        flat[cursor++] = current[column] ?? 0
      }
    }
    const sourceHeight = left.length
    const sourceWidth = left[0]?.length ?? 0
    const result = new Array<number[]>(sourceHeight * sourceWidth)
    let position = 0
    for (let row = 0; row < sourceHeight; row++) {
      const current = left[row] ?? []
      for (let column = 0; column < sourceWidth; column++) {
        const factor = current[column] ?? 0
        const scaled = new Array<number>(length)
        for (let index = 0; index < length; index++) {
          scaled[index] = factor * (flat[index] ?? 0)
        }
        result[position++] = scaled
      }
    }
    return result
  }
  if (axes === 2) {
    let sum = 0
    for (let index = 0; index < left.length; index++) {
      const current = left[index] ?? []
      const line = right[index] ?? []
      for (let column = 0; column < current.length; column++) {
        sum += (current[column] ?? 0) * (line[column] ?? 0)
      }
    }
    return sum
  }
  return matmul(left, right)
}
