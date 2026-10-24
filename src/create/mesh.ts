/**
 * Create a coordinate grid.
 * @description Builds coordinate arrays for each grid axis.
 * @param rows - Coordinates along the first axis
 * @param columns - Coordinates along the second axis
 * @param indexing - Indexing order of the returned grid
 * @returns Grid of coordinate arrays
 */
export default function mesh(
  rows: number[],
  columns?: number[],
  indexing: 'xy' | 'ij' = 'xy'
): number[][][] {
  if (!columns) {
    const height = rows[0] ?? 0
    const width = rows[1] ?? height
    const grid = new Array<number[]>(height)
    const columnAxis = new Array<number[]>(height)
    const template = new Array<number>(width)
    for (let column = 0; column < width; column++) {
      template[column] = column
    }
    for (let row = 0; row < height; row++) {
      grid[row] = new Array<number>(width).fill(row)
      columnAxis[row] = template.slice()
    }
    return [grid, columnAxis]
  }
  const height = rows.length
  const width = columns.length
  if (indexing === 'ij') {
    const rowAxis = new Array<number[]>(height)
    const columnAxis = new Array<number[]>(height)
    for (let index = 0; index < height; index++) {
      rowAxis[index] = new Array<number>(width).fill(rows[index] ?? 0)
      columnAxis[index] = columns.slice()
    }
    return [rowAxis, columnAxis]
  }
  const columnAxis = new Array<number[]>(width)
  const rowAxis = new Array<number[]>(width)
  for (let index = 0; index < width; index++) {
    columnAxis[index] = rows.slice()
    rowAxis[index] = new Array<number>(height).fill(columns[index] ?? 0)
  }
  return [columnAxis, rowAxis]
}
