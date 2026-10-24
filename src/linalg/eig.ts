import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/** Residual bound that marks an eigenvector as converged */
const residualLimit = 1e-13

/**
 * Compute eigenvalues and eigenvectors of matrices.
 * @description Uses Jacobi iteration for symmetric matrices, otherwise QR.
 * @param matrix - Square matrix to decompose
 * @param only - When true returns eigenvalues without eigenvectors
 * @returns Eigenvalues alone or eigenvalues with eigenvectors
 */
export default function eig(
  matrix: number[][],
  only = false
): number[] | Types.NumerixEigen {
  const order = matrix.length
  if (!isSymmetric(matrix)) {
    const values = Internal.eigqr(matrix)
    if (only) {
      return values
    }
    const columns = new Array<number[]>(order)
    for (let column = 0; column < order; column++) {
      columns[column] = findEigenvector(matrix, values[column] ?? 0)
    }
    const vectors = new Array<number[]>(order)
    for (let column = 0; column < order; column++) {
      vectors[column] = columns[column] ?? []
    }
    return { values, vectors }
  }
  const decomposition = jacobi(matrix, only)
  if (only) {
    return decomposition.values
  }
  return decomposition
}

/**
 * Find an eigenvector for an eigenvalue.
 * @description Solves the shifted system by Gaussian elimination.
 * @param matrix - Original matrix of the decomposition
 * @param eigenvalue - Eigenvalue whose eigenvector is sought
 * @returns Normalized eigenvector for the eigenvalue
 */
function findEigenvector(matrix: number[][], eigenvalue: number): number[] {
  const order = matrix.length
  const factors = new Array<Float64Array>(order)
  for (let row = 0; row < order; row++) {
    const source = matrix[row] ?? []
    const current = new Float64Array(order)
    for (let column = 0; column < order; column++) {
      current[column] = row === column
        ? (source[column] ?? 0) - eigenvalue + 1e-12
        : (source[column] ?? 0)
    }
    factors[row] = current
  }
  const permutation = new Array<number>(order)
  for (let index = 0; index < order; index++) {
    permutation[index] = index
  }
  for (let column = 0; column < order; column++) {
    let swap = column
    let largest = Math.abs(factors[column]?.[column] ?? 0)
    for (let row = column + 1; row < order; row++) {
      const entry = Math.abs(factors[row]?.[column] ?? 0)
      if (entry > largest) {
        largest = entry
        swap = row
      }
    }
    const first = factors[column]
    const second = factors[swap]
    if (first && second) {
      factors[column] = second
      factors[swap] = first
      const held = permutation[column] ?? 0
      permutation[column] = permutation[swap] ?? 0
      permutation[swap] = held
    }
    const pivot = factors[column] as Float64Array
    const divisor = pivot[column] || 1e-14
    for (let row = column + 1; row < order; row++) {
      const current = factors[row] as Float64Array
      if (!current) {
        continue
      }
      const factor = current[column]! / divisor
      current[column] = factor
      for (let target = column + 1; target < order; target++) {
        current[target] = current[target]! - factor * pivot[target]!
      }
    }
  }
  const vector = new Array<number>(order).fill(1)
  const solution = new Float64Array(order)
  const forward = new Float64Array(order)
  for (let iteration = 0; iteration < 30; iteration++) {
    for (let row = 0; row < order; row++) {
      let sum = vector[permutation[row] ?? 0] ?? 0
      for (let column = 0; column < row; column++) {
        sum -= factors[row]![column]! * forward[column]!
      }
      forward[row] = sum
    }
    for (let row = order - 1; row >= 0; row--) {
      let sum = forward[row]!
      for (let column = row + 1; column < order; column++) {
        sum -= factors[row]![column]! * solution[column]!
      }
      solution[row] = sum / (factors[row]![row]! || 1e-14)
    }
    let total = 0
    for (let row = 0; row < order; row++) {
      const entry = solution[row]!
      total += entry * entry
    }
    const scale = 1 / (Math.sqrt(total) || 1)
    for (let index = 0; index < order; index++) {
      vector[index] = solution[index]! * scale
    }
    let residual = 0
    for (let row = 0; row < order; row++) {
      let product = 0
      for (let column = 0; column < order; column++) {
        product += (matrix[row]?.[column] ?? 0) * vector[column]!
      }
      const difference = product - eigenvalue * vector[row]!
      residual += difference * difference
    }
    if (Math.sqrt(residual) <= residualLimit) {
      break
    }
  }
  return vector
}

/**
 * Check whether a matrix is symmetric.
 * @description Compares every upper triangle entry with its mirror.
 * @param matrix - Matrix to inspect for symmetry
 * @returns True when the matrix equals its transpose
 */
function isSymmetric(matrix: number[][]): boolean {
  const order = matrix.length
  for (let row = 0; row < order; row++) {
    for (let column = row + 1; column < order; column++) {
      if (Math.abs((matrix[row]?.[column] ?? 0) - (matrix[column]?.[row] ?? 0)) > 1e-12) {
        return false
      }
    }
  }
  return true
}

/**
 * Decompose a symmetric matrix with Jacobi.
 * @description Applies plane rotations until the matrix becomes diagonal.
 * @param matrix - Symmetric matrix to decompose
 * @param only - When true the eigenvector accumulation is skipped
 * @returns Eigenvalues in ascending order with their eigenvectors
 */
function jacobi(
  matrix: number[][],
  only = false
): Types.NumerixEigen {
  const order = matrix.length
  const grid = Internal.working(matrix)
  const columns = new Array<number[]>(order)
  if (!only) {
    for (let row = 0; row < order; row++) {
      const vector = new Array<number>(order).fill(0)
      vector[row] = 1
      columns[row] = vector
    }
  }
  let magnitude = 0
  for (let row = 0; row < order; row++) {
    for (let column = 0; column < order; column++) {
      magnitude += (grid[row]?.[column] ?? 0) * (grid[row]?.[column] ?? 0)
    }
  }
  const tolerance = Math.sqrt(magnitude) * 1e-15
  for (let sweep = 0; sweep < 60; sweep++) {
    let offDiagonal = 0
    for (let row = 0; row < order - 1; row++) {
      for (let column = row + 1; column < order; column++) {
        const entry = grid[row]?.[column] ?? 0
        offDiagonal += entry * entry
      }
    }
    if (Math.sqrt(2 * offDiagonal) <= tolerance) {
      break
    }
    for (let row = 0; row < order - 1; row++) {
      for (let column = row + 1; column < order; column++) {
        const entry = grid[row]?.[column] ?? 0
        if (Math.abs(entry) <= tolerance * 0.1) {
          continue
        }
        const diagonal = grid[row]?.[row] ?? 0
        const opposite = grid[column]?.[column] ?? 0
        const ratio = (opposite - diagonal) / (2 * entry)
        const tangent = (ratio >= 0 ? 1 : -1) /
          (Math.abs(ratio) + Math.sqrt(ratio * ratio + 1))
        const cosine = 1 / Math.sqrt(tangent * tangent + 1)
        const sine = tangent * cosine
        for (let index = 0; index < order; index++) {
          const first = grid[index]?.[row] ?? 0
          const second = grid[index]?.[column] ?? 0
          const target = grid[index]
          if (target) {
            target[row] = cosine * first - sine * second
            target[column] = sine * first + cosine * second
          }
        }
        for (let index = 0; index < order; index++) {
          const first = grid[row]?.[index] ?? 0
          const second = grid[column]?.[index] ?? 0
          const target = grid[row]
          const counterpart = grid[column]
          if (target && counterpart) {
            target[index] = cosine * first - sine * second
            counterpart[index] = sine * first + cosine * second
          }
        }
        if (!only) {
          for (let index = 0; index < order; index++) {
            const first = columns[index]?.[row] ?? 0
            const second = columns[index]?.[column] ?? 0
            const target = columns[index]
            if (target) {
              target[row] = cosine * first - sine * second
              target[column] = sine * first + cosine * second
            }
          }
        }
      }
    }
  }
  const raw = new Array<number>(order)
  const indices = new Array<number>(order)
  for (let index = 0; index < order; index++) {
    raw[index] = grid[index]?.[index] ?? 0
    indices[index] = index
  }
  indices.sort((left, right) => (raw[left] ?? 0) - (raw[right] ?? 0))
  const values = new Array<number>(order)
  if (only) {
    for (let index = 0; index < order; index++) {
      values[index] = raw[indices[index] ?? 0] ?? 0
    }
    return { values, vectors: [] }
  }
  const vectors = new Array<number[]>(order)
  for (let index = 0; index < order; index++) {
    const source = indices[index] ?? 0
    values[index] = raw[source] ?? 0
    const vector = new Array<number>(order)
    for (let row = 0; row < order; row++) {
      vector[row] = columns[row]?.[source] ?? 0
    }
    vectors[index] = vector
  }
  return { values, vectors }
}
