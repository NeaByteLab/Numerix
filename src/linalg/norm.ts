import svd from '@app/linalg/svd.ts'

/**
 * Compute a vector or matrix norm.
 * @description Measures magnitude using the requested order.
 * @param input - Vector or matrix whose norm is computed
 * @param order - Norm order or named variant
 * @returns Magnitude of the input
 */
export default function norm(
  input: number[] | number[][],
  order?: number | 'fro' | 'nuc' | 'inf' | '-inf'
): number {
  if (Array.isArray(input[0])) {
    const matrix = input as number[][]
    const rows = matrix.length
    const columns = matrix[0]?.length ?? 0
    if (order === 2 || order === -2 || order === 'nuc') {
      const singular = svd(matrix, true) as number[]
      if (order === 2) {
        return singular[0] ?? 0
      }
      if (order === -2) {
        return singular[singular.length - 1] ?? 0
      }
      let sum = 0
      for (let index = 0; index < singular.length; index++) {
        sum += singular[index] ?? 0
      }
      return sum
    }
    if (order === 1 || order === -1) {
      let best = order === 1 ? -Infinity : Infinity
      for (let column = 0; column < columns; column++) {
        let sum = 0
        for (let row = 0; row < rows; row++) {
          sum += Math.abs(matrix[row]?.[column] ?? 0)
        }
        if (order === 1 ? sum > best : sum < best) {
          best = sum
        }
      }
      return best
    }
    if (order === 'inf' || order === Infinity || order === '-inf' || order === -Infinity) {
      const maximize = order === 'inf' || order === Infinity
      let best = maximize ? -Infinity : Infinity
      for (let row = 0; row < rows; row++) {
        const current = matrix[row] ?? []
        let sum = 0
        for (let column = 0; column < current.length; column++) {
          sum += Math.abs(current[column] ?? 0)
        }
        if (maximize ? sum > best : sum < best) {
          best = sum
        }
      }
      return best
    }
    let total = 0
    for (let row = 0; row < rows; row++) {
      const current = matrix[row] ?? []
      for (let column = 0; column < current.length; column++) {
        const entry = current[column] ?? 0
        total += entry * entry
      }
    }
    return Math.sqrt(total)
  }
  const flat = input as number[]
  const length = flat.length
  if (order === undefined || order === 'fro' || order === 'nuc' || order === 2) {
    let sum = 0
    for (let index = 0; index < length; index++) {
      const entry = flat[index] ?? 0
      sum += entry * entry
    }
    return Math.sqrt(sum)
  }
  if (order === 'inf' || order === Infinity) {
    let peak = -Infinity
    for (let index = 0; index < length; index++) {
      const absolute = Math.abs(flat[index] ?? 0)
      if (absolute > peak) {
        peak = absolute
      }
    }
    return peak
  }
  if (order === '-inf' || order === -Infinity) {
    let trough = Infinity
    for (let index = 0; index < length; index++) {
      const absolute = Math.abs(flat[index] ?? 0)
      if (absolute < trough) {
        trough = absolute
      }
    }
    return trough
  }
  if (order === 0) {
    let count = 0
    for (let index = 0; index < length; index++) {
      if ((flat[index] ?? 0) !== 0) {
        count++
      }
    }
    return count
  }
  if (order === 1) {
    let sum = 0
    for (let index = 0; index < length; index++) {
      sum += Math.abs(flat[index] ?? 0)
    }
    return sum
  }
  let sum = 0
  for (let index = 0; index < length; index++) {
    sum += Math.pow(Math.abs(flat[index] ?? 0), order)
  }
  return Math.pow(sum, 1 / order)
}
