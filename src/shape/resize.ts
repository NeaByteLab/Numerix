import flatten from '@app/shape/flatten.ts'
import reshape from '@app/shape/reshape.ts'

/**
 * Resize a nested array.
 * @description Truncates or pads values to fit the target shape.
 * @param input - Nested array to resize
 * @param shape - Target shape of the resized result
 * @returns Array with the requested shape
 */
export default function resize(input: unknown[], shape: number | number[]): unknown {
  const sizes = typeof shape === 'number' ? [shape] : shape
  if (sizes.length === 0) {
    return []
  }
  let total = 1
  for (let index = 0; index < sizes.length; index++) {
    const extent = sizes[index] ?? 0
    if (extent < 0) {
      throw new RangeError('all elements of new_shape must be non-negative')
    }
    total *= extent
  }
  const flattened = Array.isArray(input[0]) ? flatten<unknown>(input) : input
  const values = flattened.length === 0 ? [0] : flattened
  return reshape(
    Array.from(
      { length: total },
      (_unused, index) => values[index % values.length]
    ),
    sizes
  )
}
