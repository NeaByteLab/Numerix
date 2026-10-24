import * as Internal from '@app/internal/index.ts'

/**
 * Broadcast a value to a shape.
 * @description Expands nested inputs to the requested dimensions.
 * @param input - Value or nested array to broadcast
 * @param shape - Target shape of the broadcast result
 * @param mode - Broadcast mode or shape inference variant
 * @returns Broadcast value or inferred shape
 */
export default function broadcast(
  input: unknown,
  shape: number[],
  mode: 'to' | 'shape' = 'to'
): unknown {
  if (mode === 'shape' && Array.isArray(input)) {
    const source = Array.isArray(input[0])
      ? (input as number[][]).map((row) => row.length)
      : (input as number[]).length > 0
      ? [input.length]
      : []
    const leftSize = source.length
    const rightSize = shape.length
    const count = leftSize > rightSize ? leftSize : rightSize
    const result = new Array<number>(count)
    for (let index = 0; index < count; index++) {
      const leftScale = index >= count - leftSize ? (source[index - (count - leftSize)] ?? 1) : 1
      const rightScale = index >= count - rightSize ? (shape[index - (count - rightSize)] ?? 1) : 1
      result[index] = leftScale > rightScale ? leftScale : rightScale
    }
    return result
  }
  return buildBroadcast(input, Internal.depth(input), shape, 0)
}

/**
 * Build a broadcast value.
 * @description Recursively expands values into the target shape.
 * @param value - Value to expand at this level
 * @param level - Remaining nesting depth of the source value
 * @param target - Target shape of the broadcast result
 * @param offset - Current position within the target shape
 * @returns Expanded value for the current level
 */
function buildBroadcast(
  value: unknown,
  level: number,
  target: number[],
  offset: number
): unknown {
  if (offset >= target.length) {
    return value
  }
  const head = target[offset] ?? 0
  const remaining = target.length - offset
  if (level < remaining) {
    const result = new Array<unknown>(head)
    const template = buildBroadcast(value, level, target, offset + 1)
    for (let index = 0; index < head; index++) {
      result[index] = index === 0 ? template : copyValue(template)
    }
    return result
  }
  const source = value as unknown[]
  if (source.length === 1 && head > 1) {
    const result = new Array<unknown>(head)
    const first = source[0]
    for (let index = 0; index < head; index++) {
      result[index] = buildBroadcast(first, level - 1, target, offset + 1)
    }
    return result
  }
  const length = source.length
  const result = new Array<unknown>(length)
  for (let index = 0; index < length; index++) {
    result[index] = buildBroadcast(source[index], level - 1, target, offset + 1)
  }
  return result
}

/**
 * Copy a nested value into structure.
 * @description Duplicates every level of a nested list.
 * @param value - Nested value to copy
 * @returns Independent copy holding the same entries
 */
function copyValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    const copy = (value as unknown[]).slice()
    for (let index = 0; index < copy.length; index++) {
      const element = copy[index]
      if (Array.isArray(element)) {
        copy[index] = copyValue(element)
      }
    }
    return copy
  }
  return value
}
