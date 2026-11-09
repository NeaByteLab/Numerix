import * as Create from '@app/create/index.ts'
import where from '@app/index/where.ts'

/**
 * Build index coordinate pairs.
 * @description Generates coordinate pairs for a matrix pattern.
 * @param order - Number of coordinates, a row and column count tuple, or an existing matrix
 * @param policy - Pattern of the generated coordinates or mask function
 * @param offset - Diagonal offset applied to the pattern
 * @returns Row and column coordinate pairs
 */
export default function mask(
  order: number | [number, number] | unknown[][],
  policy:
    | 'diag'
    | 'tril'
    | 'triu'
    | ((
      table: number[][],
      shift: number
    ) => unknown[][]) = 'diag',
  offset = 0
): [number[], number[]] {
  const height = typeof order === 'number'
    ? order
    : typeof order[0] === 'number'
    ? (order as [number, number])[0]
    : (order as unknown[][]).length
  const width = typeof order === 'number'
    ? order
    : typeof order[0] === 'number'
    ? (order as [number, number])[1]
    : ((order as unknown[][])[0]?.length ?? 0)
  if (
    typeof policy !== 'function' &&
    policy !== 'diag' &&
    policy !== 'tril' &&
    policy !== 'triu'
  ) {
    throw new RangeError("mode must be one of 'diag', 'tril', 'triu', or a function")
  }
  if (typeof policy === 'function') {
    return where(policy(Create.one([height, width]) as number[][], offset) as number[][]) as [
      number[],
      number[]
    ]
  }
  if (height < 0 || width < 0) {
    throw new RangeError('negative dimensions are not allowed')
  }
  if (height === 0) {
    return [[]] as unknown as [number[], number[]]
  }
  const vertical: number[] = []
  const columns: number[] = []
  if (policy === 'diag') {
    for (
      let outer = Math.max(0, -offset);
      outer < height && outer + offset < width;
      outer++
    ) {
      vertical.push(outer)
      columns.push(outer + offset)
    }
    return [vertical, columns]
  }
  for (let outer = 0; outer < height; outer++) {
    for (
      let column = policy === 'triu' ? Math.max(0, outer + offset) : 0;
      column <= (policy === 'tril' ? Math.min(width - 1, outer + offset) : width - 1);
      column++
    ) {
      vertical.push(outer)
      columns.push(column)
    }
  }
  return [vertical, columns]
}
