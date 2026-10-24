/**
 * Remove unit dimensions from an array.
 * @description Drops array levels that hold a single entry.
 * @param input - Value or nested array to squeeze
 * @returns Value without its unit dimensions
 */
export default function squeeze(input: unknown): unknown {
  if (!Array.isArray(input)) {
    return input
  }
  const length = input.length
  if (length === 0) {
    return []
  }
  if (length === 1) {
    return squeeze(input[0])
  }
  if (!Array.isArray(input[0])) {
    return input.slice()
  }
  const mapped = new Array<unknown>(length)
  for (let index = 0; index < length; index++) {
    mapped[index] = squeeze(input[index])
  }
  return mapped
}
