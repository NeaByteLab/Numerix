import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Choose values from an array.
 * @description Selects entries with or without replacement.
 * @template T - Type of the selectable values
 * @param values - Source array of selectable values
 * @param count - Number of choices to make when given
 * @param replace - When true, allows repeated selections
 * @param generator - Generator supplying uniform samples or probability weights
 * @param source - Generator used when weights are supplied
 * @returns Single chosen value or array of choices
 */
export default function choice<T = number>(
  values: T[] | number,
  count?: number,
  replace = true,
  generator?: Types.NumerixGenerator | number[],
  source?: Types.NumerixGenerator
): T | T[] {
  const weights = Array.isArray(generator) ? generator : undefined
  const active = Array.isArray(generator) ? source : generator
  if (typeof values === 'number') {
    if (values <= 0) {
      if (count === 0) {
        return []
      }
      throw new RangeError('a must be greater than 0 unless no samples are taken')
    }
    if (weights === undefined && (replace || count === undefined)) {
      return count === undefined
        ? (Math.floor(Internal.source(active) * values) as unknown as T)
        : Array.from(
          { length: count },
          () => Math.floor(Internal.source(active) * values) as unknown as T
        )
    }
  }
  const population = typeof values === 'number'
    ? Array.from({ length: values }, (_outer, index) => index as unknown as T)
    : values
  const length = population.length
  if (length === 0 && weights === undefined) {
    if (count === 0) {
      return []
    }
    throw new RangeError('Cannot choose from an empty array')
  }
  if (weights !== undefined) {
    if (weights.length !== length) {
      throw new RangeError('a and p must have same count')
    }
    let total = 0
    let positive = 0
    for (let index = 0; index < length; index++) {
      const weight = weights[index] ?? 0
      if (weight < 0 || Number.isNaN(weight)) {
        throw new RangeError('probabilities are not non-negative')
      }
      if (weight > 0) {
        positive++
      }
      total += weight
    }
    if (Math.abs(total - 1) > 1e-8) {
      throw new RangeError('probabilities do not sum to 1')
    }
    if (!replace && count !== undefined && count > positive) {
      throw new RangeError('Fewer non-zero entries in p than size')
    }
    const remaining = !replace && count !== undefined ? weights.slice() : weights
    let remainder = total
    const result = Array.from({ length: count ?? 1 }, () => {
      let target = Internal.source(active) * remainder
      let picked = remaining.length - 1
      for (let index = 0; index < remaining.length; index++) {
        target -= remaining[index] ?? 0
        if (target < 0) {
          picked = index
          break
        }
      }
      if (!replace && count !== undefined) {
        remainder -= remaining[picked] ?? 0
        remaining[picked] = 0
      }
      return population[picked] as T
    })
    return count === undefined ? (result[0] as T) : result
  }
  if (count === undefined) {
    return population[Math.floor(Internal.source(active) * length)] as T
  }
  if (!replace && count > length) {
    throw new RangeError('Cannot take a larger sample than population when replace is false')
  }
  if (replace) {
    return Array.from(
      { length: count },
      () => population[Math.floor(Internal.source(active) * length)] as T
    )
  }
  const shuffled = population.slice()
  return Array.from({ length: count }, (_outer, index) => {
    const offset = index + Math.floor(Internal.source(active) * (length - index))
    const picked = shuffled[offset] as T
    shuffled[offset] = shuffled[index] as T
    shuffled[index] = picked
    return picked
  })
}
