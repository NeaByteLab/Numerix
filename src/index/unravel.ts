/**
 * Convert a flat index to coordinates.
 * @description Computes the position of an offset along each axis.
 * @param index - Flat offset to convert
 * @param dimensions - Length of each axis
 * @returns Coordinate along each axis
 */
export default function unravel(index: number, dimensions: number[]): number[] {
  const coordinates = new Array<number>(dimensions.length)
  let remainder = index
  for (let axis = dimensions.length - 1; axis >= 0; axis--) {
    const dimension = dimensions[axis] ?? 1
    coordinates[axis] = remainder % dimension
    remainder = Math.floor(remainder / dimension)
  }
  return coordinates
}
