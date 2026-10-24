import type * as Types from '@app/types.ts'

/**
 * Compute a QR decomposition.
 * @description Factorizes a matrix into orthogonal and upper triangular factors.
 * @param matrix - Matrix to factorize
 * @returns Orthogonal and upper triangular factors
 */
export default function qr(matrix: number[][]): Types.NumerixQr {
  const rows = matrix.length
  const columns = matrix[0]?.length ?? 0
  const working = new Float64Array(rows * columns)
  for (let row = 0; row < rows; row++) {
    const source = matrix[row] ?? []
    for (let column = 0; column < columns; column++) {
      working[column * rows + row] = source[column] ?? 0
    }
  }
  const reflectors = new Array<Float64Array>(columns)
  const steps = Math.min(columns, rows)
  for (let step = 0; step < steps; step++) {
    const base = step * rows
    let squared = 0
    for (let row = step; row < rows; row++) {
      const entry = working[base + row] ?? 0
      squared += entry * entry
    }
    const norm = Math.sqrt(squared)
    if (norm === 0) {
      reflectors[step] = new Float64Array(0)
      continue
    }
    const vector = new Float64Array(rows)
    const alpha = (working[base + step] ?? 0) >= 0 ? -norm : norm
    for (let row = step; row < rows; row++) {
      vector[row] = working[base + row] ?? 0
    }
    vector[step] = (vector[step] ?? 0) - alpha
    let square = 0
    for (let row = step; row < rows; row++) {
      const entry = vector[row] ?? 0
      square += entry * entry
    }
    const length = Math.sqrt(square)
    if (length === 0) {
      reflectors[step] = new Float64Array(0)
      continue
    }
    for (let row = step; row < rows; row++) {
      vector[row] = (vector[row] ?? 0) / length
    }
    reflectors[step] = vector
    for (let column = step + 1; column < columns; column++) {
      const offset = column * rows
      let projection = 0
      for (let row = step; row < rows; row++) {
        projection += (vector[row] ?? 0) * (working[offset + row] ?? 0)
      }
      const factor = 2 * projection
      for (let row = step; row < rows; row++) {
        working[offset + row] = (working[offset + row] ?? 0) -
          factor * (vector[row] ?? 0)
      }
    }
    working[base + step] = alpha
    for (let row = step + 1; row < rows; row++) {
      working[base + row] = 0
    }
  }
  const upper = new Array<number[]>(columns)
  for (let row = 0; row < columns; row++) {
    const values = new Array<number>(columns)
    for (let column = 0; column < columns; column++) {
      values[column] = row <= column ? working[column * rows + row] ?? 0 : 0
    }
    upper[row] = values
  }
  const lanes = new Array<Float64Array>(columns)
  const candidate = new Float64Array(rows)
  for (let column = 0; column < columns; column++) {
    candidate.fill(0)
    candidate[column] = 1
    const last = Math.min(column, steps - 1)
    for (let step = last; step >= 0; step--) {
      const vector = reflectors[step] ?? new Float64Array(0)
      if (vector.length === 0) {
        continue
      }
      let projection = 0
      for (let row = 0; row < rows; row++) {
        projection += (vector[row] ?? 0) * (candidate[row] ?? 0)
      }
      const factor = 2 * projection
      for (let row = 0; row < rows; row++) {
        candidate[row] = (candidate[row] ?? 0) - factor * (vector[row] ?? 0)
      }
    }
    lanes[column] = candidate.slice()
  }
  const orthogonal = new Array<number[]>(rows)
  for (let row = 0; row < rows; row++) {
    const values = new Array<number>(columns)
    for (let column = 0; column < columns; column++) {
      values[column] = lanes[column]?.[row] ?? 0
    }
    orthogonal[row] = values
  }
  return { Q: orthogonal, R: upper }
}
