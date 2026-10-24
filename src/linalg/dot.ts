import matmul from '@app/linalg/matmul.ts'

/**
 * Compute the dot product of vectors.
 * @description Multiplies matching entries and sums the results.
 * @param left - First vector or array of vectors
 * @param right - Second vector or array of vectors
 * @returns Dot products matching the input shape
 */
export default function dot(
  left: number[] | number[][],
  right: number[] | number[][]
): number | number[] | number[][] {
  if (!Array.isArray(left[0]) && !Array.isArray(right[0])) {
    const first = left as number[]
    const second = right as number[]
    let sum = 0
    for (let index = 0; index < first.length; index++) {
      sum += (first[index] ?? 0) * (second[index] ?? 0)
    }
    return sum
  }
  if (Array.isArray(left[0]) && !Array.isArray(right[0])) {
    const source = left as number[][]
    const second = right as number[]
    const rows = source.length
    const result = new Array<number>(rows)
    for (let row = 0; row < rows; row++) {
      const current = source[row] ?? []
      let sum = 0
      for (let index = 0; index < current.length; index++) {
        sum += (current[index] ?? 0) * (second[index] ?? 0)
      }
      result[row] = sum
    }
    return result
  }
  if (!Array.isArray(left[0]) && Array.isArray(right[0])) {
    const first = left as number[]
    const source = right as number[][]
    const columns = source[0]?.length ?? 0
    const result = new Array<number>(columns).fill(0)
    for (let row = 0; row < first.length; row++) {
      const factor = first[row] ?? 0
      if (factor === 0) {
        continue
      }
      const current = source[row] ?? []
      for (let column = 0; column < columns; column++) {
        result[column] = (result[column] ?? 0) + factor * (current[column] ?? 0)
      }
    }
    return result
  }
  return matmul(left as number[][], right as number[][])
}
