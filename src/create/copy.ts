/**
 * Clone a value into new containers.
 * @description Copies nested arrays into fresh array instances.
 * @param value - Value to clone
 * @returns Cloned copy of the value
 */
function cloneValue(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value
  }
  const length = value.length
  if (length === 0) {
    return []
  }
  if (!Array.isArray(value[0])) {
    return value.slice()
  }
  const result = new Array<unknown>(length)
  for (let index = 0; index < length; index++) {
    result[index] = cloneValue(value[index])
  }
  return result
}

/**
 * Copy a value into an array.
 * @description Clones nested values into a fresh container.
 * @param source - Value to copy
 * @param target - Array receiving the copied values
 * @returns Copied value
 * @template T - Type of the copied value
 */
export default function copy<T>(source: T, target?: unknown[]): T {
  const cloned = cloneValue(source) as T
  if (target && Array.isArray(cloned)) {
    const length = cloned.length
    target.length = length
    for (let index = 0; index < length; index++) {
      target[index] = cloned[index]
    }
  }
  return cloned
}
