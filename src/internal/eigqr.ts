import working from '@app/internal/working.ts'
import * as Linalg from '@app/linalg/index.ts'

/** Deflation threshold for a negligible subdiagonal entry */
const limit = 1e-14

/** Upper bound on the number of QR sweeps */
const ceiling = 500

/**
 * Compute eigenvalues of a real matrix.
 * @description Uses shifted QR with deflation of converged blocks.
 * @param matrix - Square matrix whose eigenvalues are sought
 * @returns Eigenvalues in the order produced by the deflation
 */
export default function eigqr(matrix: number[][]): number[] {
  const order = matrix.length
  const grid = working(matrix)
  const values = new Array<number>(order).fill(Number.NaN)
  let sweeps = 0
  let active = order - 1
  while (active >= 0) {
    while (active > 0 && sweeps > 0 && Math.abs(grid[active]?.[active - 1] ?? 0) < limit) {
      values[active] = grid[active]?.[active] ?? 0
      active--
    }
    if (active === 0) {
      values[0] = grid[0]?.[0] ?? 0
      break
    }
    if (sweeps >= ceiling) {
      break
    }
    sweeps++
    const size = active + 1
    const preferred = wilkinsonShift(
      grid[active - 1]?.[active - 1] ?? 0,
      grid[active - 1]?.[active] ?? 0,
      grid[active]?.[active - 1] ?? 0,
      grid[active]?.[active] ?? 0
    )
    const fallback = grid[active]?.[active] ?? 0
    for (let attempt = 0; attempt < 2; attempt++) {
      const shift = attempt === 0 ? preferred : fallback
      if (sweep(grid, size, shift)) {
        break
      }
    }
  }
  for (let index = 0; index < order; index++) {
    if (Number.isNaN(values[index] ?? Number.NaN)) {
      values[index] = grid[index]?.[index] ?? 0
    }
  }
  return values
}

/**
 * Apply one shifted QR sweep.
 * @description Replaces the active block by R times Q.
 * @param grid - Matrix carrying the active block
 * @param size - Number of leading rows and columns that form the active block
 * @param shift - Value subtracted from the diagonal before the factorization
 * @returns True when the sweep was applied
 */
function sweep(grid: number[][], size: number, shift: number): boolean {
  const block = new Array<number[]>(size)
  for (let row = 0; row < size; row++) {
    const source = grid[row] ?? []
    const current = new Array<number>(size)
    for (let column = 0; column < size; column++) {
      current[column] = (source[column] ?? 0) - (column === row ? shift : 0)
    }
    block[row] = current
  }
  const { Q, R } = Linalg.qr(block)
  for (let index = 0; index < size; index++) {
    if ((R[index]?.[index] ?? 0) === 0) {
      return false
    }
  }
  const product = Linalg.matmul(R, Q)
  for (let row = 0; row < size; row++) {
    const target = grid[row]
    const values = product[row] ?? []
    for (let column = 0; column < size; column++) {
      if (target) {
        target[column] = (values[column] ?? 0) + (column === row ? shift : 0)
      }
    }
  }
  return true
}

/**
 * Compute the Wilkinson shift.
 * @description Picks the root closest to the bottom right entry.
 * @param leading - Leading diagonal entry of the trailing block
 * @param upper - Upper right entry of the trailing block
 * @param lower - Lower left entry of the trailing block
 * @param trailing - Trailing diagonal entry of the trailing block
 * @returns Shift that accelerates the QR iteration
 */
function wilkinsonShift(leading: number, upper: number, lower: number, trailing: number): number {
  const trace = leading + trailing
  const determinant = leading * trailing - upper * lower
  const discriminant = (trace * trace) / 4 - determinant
  const root = discriminant > 0 ? Math.sqrt(discriminant) : 0
  const first = trace / 2 + root
  const second = trace / 2 - root
  return Math.abs(first - trailing) <= Math.abs(second - trailing) ? first : second
}
