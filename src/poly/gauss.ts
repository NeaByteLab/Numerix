import type * as Types from '@app/types.ts'
import * as Linalg from '@app/linalg/index.ts'

/**
 * Generate Gauss quadrature nodes and weights.
 * @description Computes nodes and weights for a quadrature family.
 * @param degree - Number of quadrature points to generate
 * @param kind - Quadrature weight family
 * @returns Quadrature nodes and their weights
 */
export default function gauss(
  degree: number,
  kind: Types.NumerixGauss = 'chebyshev'
): [number[], number[]] {
  if (kind === 'chebyshev') {
    const nodes = new Array<number>(degree)
    const step = Math.PI / (2 * degree)
    for (let index = 0; index < degree; index++) {
      nodes[index] = Math.cos(step * (2 * index + 1))
    }
    const weights: number[] = new Array(degree).fill(Math.PI / degree)
    return [nodes, weights]
  }
  const jacobi = new Array<number[]>(degree)
  for (let index = 0; index < degree; index++) {
    jacobi[index] = new Array<number>(degree).fill(0)
  }
  let scale = 2
  if (kind === 'hermite') {
    scale = Math.sqrt(Math.PI)
  } else if (kind === 'hermite_e') {
    scale = Math.sqrt(2 * Math.PI)
  } else if (kind === 'laguerre') {
    scale = 1
  }
  for (let row = 0; row < degree; row++) {
    const current = jacobi[row]
    if (kind === 'laguerre' && current) {
      current[row] = 2 * row + 1
    }
    if (row < degree - 1) {
      let offDiagonal = 0
      const recurrence = row + 1
      if (kind === 'legendre') {
        offDiagonal = recurrence / Math.sqrt(4 * recurrence * recurrence - 1)
      } else if (kind === 'hermite') {
        offDiagonal = Math.sqrt(recurrence * 0.5)
      } else if (kind === 'hermite_e') {
        offDiagonal = Math.sqrt(recurrence)
      } else if (kind === 'laguerre') {
        offDiagonal = recurrence
      }
      const following = jacobi[row + 1]
      if (current) {
        current[row + 1] = offDiagonal
      }
      if (following) {
        following[row] = offDiagonal
      }
    }
  }
  const { values, vectors } = Linalg.eig(jacobi, false) as Types.NumerixEigen
  const nodes = new Array<number>(degree)
  const weights = new Array<number>(degree)
  for (let index = 0; index < degree; index++) {
    nodes[index] = values[index] ?? 0
    const component = vectors[index]?.[0] ?? 0
    weights[index] = scale * component * component
  }
  return [nodes, weights]
}
