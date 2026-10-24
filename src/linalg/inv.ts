import type * as Types from '@app/types.ts'
import svd from '@app/linalg/svd.ts'

/**
 * Compute the inverse of a matrix.
 * @description Uses SVD inversion for singular or rectangular inputs.
 * @param matrix - Matrix to invert
 * @param pseudo - When true forces a pseudo inverse
 * @returns Inverse matrix of the input
 */
export default function inv(matrix: number[][], pseudo = false): number[][] {
  const rows = matrix.length
  const columns = matrix[0]?.length ?? 0
  if (pseudo || rows !== columns) {
    const factors = svd(matrix, false) as Types.NumerixSvd
    const count = factors.S.length
    const inverse = new Float64Array(count)
    for (let index = 0; index < count; index++) {
      const singular = factors.S[index] ?? 0
      inverse[index] = singular > 1e-12 ? 1 / singular : 0
    }
    const result = new Array<number[]>(columns)
    for (let column = 0; column < columns; column++) {
      const output = new Array<number>(rows)
      for (let row = 0; row < rows; row++) {
        const left = factors.U[row] ?? []
        let sum = 0
        for (let position = 0; position < count; position++) {
          const scale = inverse[position] ?? 0
          if (scale !== 0) {
            sum += (factors.Vt[position]?.[column] ?? 0) * (left[position] ?? 0) *
              scale
          }
        }
        output[row] = sum
      }
      result[column] = output
    }
    return result
  }
  const width = 2 * columns
  const augmented = new Array<number[]>(columns)
  for (let index = 0; index < columns; index++) {
    const source = matrix[index] ?? []
    const extended = new Array<number>(width).fill(0)
    for (let column = 0; column < columns; column++) {
      extended[column] = source[column] ?? 0
    }
    extended[columns + index] = 1
    augmented[index] = extended
  }
  for (let index = 0; index < columns; index++) {
    let swap = index
    let largest = Math.abs(augmented[index]?.[index] ?? 0)
    for (let row = index + 1; row < columns; row++) {
      const candidate = Math.abs(augmented[row]?.[index] ?? 0)
      if (candidate > largest) {
        largest = candidate
        swap = row
      }
    }
    if (swap !== index) {
      const swapped = augmented[index] ?? []
      augmented[index] = augmented[swap] ?? []
      augmented[swap] = swapped
    }
    const pivot = augmented[index]!
    const inverse = 1 / (pivot[index] ?? 1)
    for (let column = index; column < width; column++) {
      pivot[column] = (pivot[column] ?? 0) * inverse
    }
    for (let row = 0; row < columns; row++) {
      if (row !== index) {
        const current = augmented[row]!
        const factor = current[index] ?? 0
        if (factor !== 0) {
          for (let column = index; column < width; column++) {
            current[column] = (current[column] ?? 0) - factor * (pivot[column] ?? 0)
          }
        }
      }
    }
  }
  const result = new Array<number[]>(columns)
  for (let row = 0; row < columns; row++) {
    result[row] = (augmented[row] ?? []).slice(columns)
  }
  return result
}
