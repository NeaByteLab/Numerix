/**
 * Convert coordinates to a flat index.
 * @description Computes the row-major offset of a coordinate.
 * @param coordinates - Position along each axis
 * @param dimensions - Length of each axis
 * @returns Flat index of the given coordinates
 */
export default function ravel(coordinates: number[], dimensions: number[]): number {
  let index = 0
  let stride = 1
  for (let axis = dimensions.length - 1; axis >= 0; axis--) {
    index += (coordinates[axis] ?? 0) * stride
    stride *= dimensions[axis] ?? 1
  }
  return index
}
