/**
 * Compute the inner product of vectors.
 * @description Multiplies matching entries and sums the results.
 * @param left - First vector or array of vectors
 * @param right - Second vector or array of vectors
 * @returns Inner products matching the input shape
 */
export default function inner(
  left: number[] | number[][],
  right: number[] | number[][]
): number | number[][] {
  if (!Array.isArray(left[0]) && !Array.isArray(right[0])) {
    const first = left as number[]
    const second = right as number[]
    const length = first.length
    let sum = 0
    for (let index = 0; index < length; index++) {
      sum += (first[index] ?? 0) * (second[index] ?? 0)
    }
    return sum
  }
  const source = (Array.isArray(left[0]) ? left : [left]) as number[][]
  const target = (Array.isArray(right[0]) ? right : [right]) as number[][]
  const rows = source.length
  const columns = target.length
  const result = new Array<number[]>(rows)
  for (let row = 0; row < rows; row++) {
    const current = source[row] ?? []
    const length = current.length
    const output = new Array<number>(columns)
    for (let column = 0; column < columns; column++) {
      const entry = target[column] ?? []
      let sum = 0
      for (let index = 0; index < length; index++) {
        sum += (current[index] ?? 0) * (entry[index] ?? 0)
      }
      output[column] = sum
    }
    result[row] = output
  }
  return result
}
