/**
 * Count occurrences of integer values.
 * @description Tallies how often each integer appears.
 * @param values - Integer values to tally
 * @param weights - Weights accumulated for each value
 * @param lowest - Lowest bin index in the result
 * @returns Bin counts for the observed values
 */
export default function bincount(
  values: number[],
  weights?: number[] | number,
  lowest: number = 0
): number[] {
  const factors = Array.isArray(weights) ? weights : undefined
  const minimum = typeof weights === 'number' ? weights : lowest
  if (minimum < 0) {
    throw new RangeError("'minlength' must not be negative")
  }
  if (factors && factors.length !== values.length) {
    throw new RangeError("The weights and list don't have the same length.")
  }
  if (values.length === 0) {
    return new Array(minimum).fill(0)
  }
  let maximum = -Infinity
  for (let index = 0; index < values.length; index++) {
    const value = values[index] ?? 0
    if (!Number.isInteger(value)) {
      throw new TypeError('bincount requires non-negative integer operands')
    }
    if (value < 0) {
      throw new RangeError('bincount rejects a negative bin index')
    }
    if (value > maximum) {
      maximum = value
    }
  }
  const counts = new Array<number>(Math.max(maximum + 1, minimum)).fill(0)
  for (let index = 0; index < values.length; index++) {
    const place = values[index] ?? 0
    counts[place] = (counts[place] ?? 0) + (factors ? (factors[index] ?? 0) : 1)
  }
  return counts
}
