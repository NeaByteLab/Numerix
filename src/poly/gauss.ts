import type * as Types from '@app/types.ts'
import * as Linalg from '@app/linalg/index.ts'

/**
 * Generate Gauss quadrature nodes and weights.
 * @description Computes nodes and weights for a quadrature family.
 * @param degree - Number of quadrature points to generate
 * @param family - Quadrature weight family
 * @returns Quadrature nodes and their weights
 */
export default function gauss(
  degree: number,
  family: Types.NumerixGauss | Types.NumerixBasis = 'chebyshev'
): [number[], number[]] {
  if (
    family !== 'chebyshev' &&
    family !== 'cheb' &&
    family !== 'legendre' &&
    family !== 'leg' &&
    family !== 'poly' &&
    family !== 'hermite' &&
    family !== 'herm' &&
    family !== 'hermite_e' &&
    family !== 'herme' &&
    family !== 'laguerre' &&
    family !== 'lag'
  ) {
    throw new RangeError('unsupported quadrature kind')
  }
  if (!Number.isInteger(degree) || degree < 1) {
    throw new RangeError('deg must be a positive integer')
  }
  if (family === 'chebyshev' || family === 'cheb') {
    return [
      Array.from(
        { length: degree },
        (_outer, index) => Math.cos((Math.PI / (2 * degree)) * (2 * index + 1))
      ),
      new Array<number>(degree).fill(Math.PI / degree)
    ]
  }
  const jacobi = Array.from({ length: degree }, () => new Array<number>(degree).fill(0))
  for (let index = 0; index < degree; index++) {
    if (family === 'laguerre' || family === 'lag') {
      jacobi[index]![index] = 2 * index + 1
    }
    if (index < degree - 1) {
      const order = index + 1
      const weight = family === 'legendre' || family === 'leg' || family === 'poly'
        ? order / Math.sqrt(4 * order * order - 1)
        : family === 'hermite' || family === 'herm'
        ? Math.sqrt(order * 0.5)
        : family === 'hermite_e' || family === 'herme'
        ? Math.sqrt(order)
        : order
      jacobi[index]![index + 1] = weight
      jacobi[index + 1]![index] = weight
    }
  }
  const eigen = Linalg.eig(jacobi, false) as Types.NumerixEigen
  const weights = Array.from(
    { length: degree },
    (_outer, index) =>
      (family === 'hermite' || family === 'herm'
        ? Math.sqrt(Math.PI)
        : family === 'hermite_e' || family === 'herme'
        ? Math.sqrt(2 * Math.PI)
        : family === 'laguerre' || family === 'lag'
        ? 1
        : 2) * (eigen.vectors[index]?.[0] ?? 0) ** 2
  )
  if (family !== 'laguerre' && family !== 'lag') {
    for (let index = 0; index <= degree - 1 - index; index++) {
      const mirror = degree - 1 - index
      const point = ((eigen.values[index] ?? 0) - (eigen.values[mirror] ?? 0)) * 0.5
      weights[index] = weights[mirror] = ((weights[index] ?? 0) + (weights[mirror] ?? 0)) * 0.5
      eigen.values[index] = point || 0
      eigen.values[mirror] = -point || 0
    }
  }
  return [eigen.values, weights]
}
