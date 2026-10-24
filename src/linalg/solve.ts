import * as Internal from '@app/internal/index.ts'

/**
 * Solve a linear system of equations.
 * @description Computes the solution for the coefficient matrix.
 * @param coefficients - Matrix of system coefficients
 * @param constants - Right hand side vector of the system
 * @param square - Whether the coefficient matrix is square
 * @returns Solution vector for the given system
 */
export default function solve(
  coefficients: number[][],
  constants: number[],
  square = false
): number[] {
  const rows = coefficients.length
  const columns = coefficients[0]?.length ?? 0
  if (square || rows !== columns) {
    const normal = Internal.gram(coefficients)
    const values = new Array<number>(columns)
    for (let column = 0; column < columns; column++) {
      let sum = 0
      for (let row = 0; row < rows; row++) {
        sum += (coefficients[row]?.[column] ?? 0) * (constants[row] ?? 0)
      }
      values[column] = sum
    }
    return solve(normal, values, false)
  }
  const augmented = new Array<number[]>(columns)
  for (let row = 0; row < columns; row++) {
    const source = coefficients[row] ?? []
    const extended = new Array<number>(columns + 1)
    for (let column = 0; column < columns; column++) {
      extended[column] = source[column] ?? 0
    }
    extended[columns] = constants[row] ?? 0
    augmented[row] = extended
  }
  for (let index = 0; index < columns; index++) {
    let swap = index
    for (let row = index + 1; row < columns; row++) {
      if (
        Math.abs(augmented[row]?.[index] ?? 0) >
          Math.abs(augmented[swap]?.[index] ?? 0)
      ) {
        swap = row
      }
    }
    const swapped = augmented[index] ?? []
    augmented[index] = augmented[swap] ?? []
    augmented[swap] = swapped
    const pivot = augmented[index] ?? []
    const inverse = 1 / (pivot[index] ?? 1)
    for (let column = index; column <= columns; column++) {
      pivot[column] = (pivot[column] ?? 0) * inverse
    }
    for (let row = 0; row < columns; row++) {
      const current = augmented[row]
      if (row !== index && current) {
        const factor = current[index] ?? 0
        for (let column = index; column <= columns; column++) {
          current[column] = (current[column] ?? 0) - factor * (pivot[column] ?? 0)
        }
      }
    }
  }
  const result = new Array<number>(columns)
  for (let row = 0; row < columns; row++) {
    result[row] = augmented[row]?.[columns] ?? 0
  }
  return result
}
