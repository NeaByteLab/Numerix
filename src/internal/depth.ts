/**
 * Measure nesting depth of a value.
 * @description Counts array levels until a non-array value is reached.
 * @param value - Value whose nesting depth is measured
 * @returns Number of nested array levels
 */
export default function depth(value: unknown): number {
  let level = 0
  let cursor = value
  while (Array.isArray(cursor)) {
    level++
    if (cursor.length === 0) {
      break
    }
    cursor = cursor[0]
  }
  return level
}
