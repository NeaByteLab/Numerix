/**
 * Build a filled array by level.
 * @description Recursively creates the levels of the target shape.
 * @param dimensions - Length of each dimension
 * @param depth - Number of levels in the target shape
 * @param level - Level currently being built
 * @param fill - Value assigned to every entry
 * @returns Filled value for the current level
 */
function buildFull(dimensions: number[], depth: number, level: number, fill: unknown): unknown {
  const length = dimensions[level] ?? 0
  if (level === depth - 1) {
    return new Array(length).fill(fill)
  }
  const result = new Array(length)
  for (let index = 0; index < length; index++) {
    result[index] = buildFull(dimensions, depth, level + 1, fill)
  }
  return result
}

/**
 * Create a filled array.
 * @description Builds an array of the given shape.
 * @param shape - Dimensions of the created array
 * @param fill - Value assigned to every entry
 * @returns Array holding the fill value
 */
export default function full(
  shape: number | number[] | unknown[],
  fill: unknown = 0
): unknown {
  let dimensions: number[]
  if (typeof shape === 'number') {
    dimensions = [shape]
  } else if (Array.isArray(shape) && (shape.length === 0 || typeof shape[0] === 'number')) {
    dimensions = shape as number[]
  } else {
    dimensions = []
    let cursor: unknown = shape
    while (Array.isArray(cursor)) {
      dimensions.push(cursor.length)
      cursor = cursor[0]
    }
  }
  const depth = dimensions.length
  if (depth === 0) {
    return []
  }
  return buildFull(dimensions, depth, 0, fill)
}
