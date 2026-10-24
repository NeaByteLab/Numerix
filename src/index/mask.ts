/**
 * Build index coordinate pairs.
 * @description Generates coordinate pairs for a matrix pattern.
 * @param order - Number of coordinates in each dimension
 * @param mode - Pattern of the generated coordinates
 * @param offset - Diagonal offset applied to the pattern
 * @returns Row and column coordinate pairs
 */
export default function mask(
  order: number,
  mode: 'diag' | 'tril' | 'triu' = 'diag',
  offset = 0
): [number[], number[]] {
  if (mode === 'diag') {
    const rows = new Array<number>(order)
    const columns = new Array<number>(order)
    for (let index = 0; index < order; index++) {
      rows[index] = index
      columns[index] = index
    }
    return [rows, columns]
  }
  const rows: number[] = []
  const columns: number[] = []
  if (mode === 'tril') {
    for (let row = 0; row < order; row++) {
      const limit = Math.min(order - 1, row + offset)
      for (let column = 0; column <= limit; column++) {
        rows.push(row)
        columns.push(column)
      }
    }
    return [rows, columns]
  }
  for (let row = 0; row < order; row++) {
    const start = Math.max(0, row + offset)
    for (let column = start; column < order; column++) {
      rows.push(row)
      columns.push(column)
    }
  }
  return [rows, columns]
}
