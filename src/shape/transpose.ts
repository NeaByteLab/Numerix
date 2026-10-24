/**
 * Transpose an array.
 * @description Reorders the axes of a nested array.
 * @param input - Nested array to transpose
 * @param axes - Axis order or swapped axis pair
 * @param second - Second axis when swapping a pair
 * @returns Transposed array
 */
export default function transpose(
  input: unknown[],
  axes?: number[] | number,
  second?: number
): unknown[] {
  if (!Array.isArray(input) || !Array.isArray(input[0])) {
    return input.slice()
  }
  if (!Array.isArray((input[0] as unknown[])[0]) && axes === undefined) {
    const height = input.length
    const width = (input[0] as unknown[]).length
    const result = new Array<unknown[]>(width)
    for (let column = 0; column < width; column++) {
      const output = new Array<unknown>(height)
      for (let row = 0; row < height; row++) {
        output[row] = (input[row] as unknown[])[column]
      }
      result[column] = output
    }
    return result
  }
  const dimensions = getShape(input)
  const depth = dimensions.length
  const permutation = new Array<number>(depth)
  if (typeof axes === 'number' && typeof second === 'number') {
    const source = axes < 0 ? depth + axes : axes
    const target = second < 0 ? depth + second : second
    for (let dimension = 0; dimension < depth; dimension++) {
      permutation[dimension] = dimension
    }
    permutation[source] = target
    permutation[target] = source
  } else if (Array.isArray(axes)) {
    for (let dimension = 0; dimension < depth; dimension++) {
      const permuted = axes[dimension] ?? dimension
      permutation[dimension] = permuted < 0 ? depth + permuted : permuted
    }
  } else {
    for (let dimension = 0; dimension < depth; dimension++) {
      permutation[dimension] = depth - 1 - dimension
    }
  }
  const shape = new Array<number>(depth)
  for (let dimension = 0; dimension < depth; dimension++) {
    shape[dimension] = dimensions[permutation[dimension] ?? 0] ?? 0
  }
  const coordinates = new Array<number>(depth)
  return buildPermuted(input, shape, permutation, coordinates, depth, 0) as unknown[]
}

/**
 * Build a permuted nested array.
 * @description Copies values following the axis permutation.
 * @param input - Nested array to permute
 * @param shape - Shape of the source array
 * @param permutation - Axis order of the result
 * @param coordinates - Position of the value in the result
 * @param depth - Number of levels to descend
 * @param level - Level currently being built
 * @returns Permuted value for the current level
 */
function buildPermuted(
  input: unknown,
  shape: number[],
  permutation: number[],
  coordinates: number[],
  depth: number,
  level: number
): unknown {
  const length = shape[level] ?? 0
  const result = new Array<unknown>(length)
  const axis = permutation[level] ?? 0
  if (level === depth - 1) {
    for (let index = 0; index < length; index++) {
      coordinates[axis] = index
      result[index] = getAt(input, coordinates, depth)
    }
    return result
  }
  for (let index = 0; index < length; index++) {
    coordinates[axis] = index
    result[index] = buildPermuted(input, shape, permutation, coordinates, depth, level + 1)
  }
  return result
}

/**
 * Read a value at coordinates.
 * @description Walks the nesting levels down to the target entry.
 * @param input - Nested array to read from
 * @param coordinates - Position of the value along each axis
 * @param depth - Number of levels to descend
 * @returns Value found at the given coordinates
 */
function getAt(input: unknown, coordinates: number[], depth: number): unknown {
  let cursor = input
  for (let dimension = 0; dimension < depth; dimension++) {
    cursor = (cursor as unknown[])[coordinates[dimension] ?? 0]
  }
  return cursor
}

/**
 * Measure the shape of an array.
 * @description Collects the length of each nesting level.
 * @param input - Nested array to measure
 * @returns Length of each dimension
 */
function getShape(input: unknown): number[] {
  const shape: number[] = []
  let cursor = input
  while (Array.isArray(cursor)) {
    shape.push(cursor.length)
    cursor = cursor[0]
  }
  return shape
}
