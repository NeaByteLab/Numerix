/**
 * Compute the cross product of vectors.
 * @description Combines vectors into a perpendicular direction.
 * @param left - First vector or array of vectors
 * @param right - Second vector or array of vectors
 * @returns Cross products matching the input shape
 */
export default function cross(
  left: number[] | number[][],
  right: number[] | number[][]
): number | number[] | number[][] {
  if (Array.isArray(left[0])) {
    const leftGrid = left as number[][]
    const rightGrid = right as number[][]
    const rows = leftGrid.length
    const result = new Array<number | number[]>(rows)
    for (let row = 0; row < rows; row++) {
      result[row] = cross1D(leftGrid[row] ?? [], rightGrid[row] ?? [])
    }
    return result as number[] | number[][]
  }
  return cross1D(left as number[], right as number[])
}

/**
 * Compute the cross product of vectors.
 * @description Combines two vectors into a perpendicular direction.
 * @param left - First vector of the product
 * @param right - Second vector of the product
 * @returns Cross product of the two vectors
 */
function cross1D(left: number[], right: number[]): number | number[] {
  if (left.length === 2 && right.length === 2) {
    return (left[0] ?? 0) * (right[1] ?? 0) - (left[1] ?? 0) * (right[0] ?? 0)
  }
  return [
    (left[1] ?? 0) * (right[2] ?? 0) - (left[2] ?? 0) * (right[1] ?? 0),
    (left[2] ?? 0) * (right[0] ?? 0) - (left[0] ?? 0) * (right[2] ?? 0),
    (left[0] ?? 0) * (right[1] ?? 0) - (left[1] ?? 0) * (right[0] ?? 0)
  ]
}
