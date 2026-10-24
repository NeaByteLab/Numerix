import type * as Types from '@app/types.ts'

/**
 * Select values using a condition.
 * @description Chooses between alternatives using the given conditions.
 * @param conditions - Conditions deciding which choice is taken
 * @param choices - Alternative values available to select
 * @param fallback - Value used when no choice applies
 * @param mode - Selection mode applied to the conditions
 * @returns Selected values for each condition
 * @template T - Type of the selectable values
 */
export default function select<T = number>(
  conditions: (boolean | number)[] | (boolean | number)[][] | T[],
  choices: (T[] | T)[],
  fallback: T = 0 as unknown as T,
  mode: Types.NumerixSelect = 'select'
): T[] {
  if (mode === 'compress' || mode === 'extract') {
    const mask = conditions as (boolean | number)[]
    const values = choices as T[]
    const result = new Array<T>()
    for (let index = 0; index < mask.length; index++) {
      if (mask[index]) {
        result.push(values[index] as T)
      }
    }
    return result
  }
  if (!Array.isArray(conditions[0])) {
    const flat = conditions as (boolean | number)[]
    const count = flat.length
    if (mode === 'choose') {
      const result = new Array<T>(count)
      for (let index = 0; index < count; index++) {
        const choice = flat[index] as number
        const row = choices[choice]
        result[index] = (Array.isArray(row) ? row[index] : row) ?? fallback
      }
      return result
    }
    if (typeof flat[0] === 'number' && Array.isArray(choices[0])) {
      const result = new Array<T>(count)
      for (let index = 0; index < count; index++) {
        const choice = flat[index] as number
        const row = choices[choice]
        result[index] = (Array.isArray(row) ? row[index] : row) ?? fallback
      }
      return result
    }
    let selected = 0
    for (let index = 0; index < count; index++) {
      if (flat[index]) {
        selected++
      }
    }
    const result = new Array<T>(selected)
    let cursor = 0
    for (let index = 0; index < count; index++) {
      if (flat[index]) {
        result[cursor++] = (choices[index] as T) ?? fallback
      }
    }
    return result
  }
  const matrix = conditions as (boolean | number)[][]
  const length = matrix[0]?.length ?? 0
  const count = matrix.length
  if (mode === 'choose') {
    const result = new Array<T>(length)
    for (let index = 0; index < length; index++) {
      const choice = matrix[0]?.[index] as number
      const row = choices[choice]
      result[index] = (Array.isArray(row) ? row[index] : row) ?? fallback
    }
    return result
  }
  const result = new Array<T>(length)
  for (let index = 0; index < length; index++) {
    let selected: T = fallback
    for (let offset = 0; offset < count; offset++) {
      const row = matrix[offset]
      if (row && row[index]) {
        const choice = choices[offset]
        selected = (Array.isArray(choice) ? choice[index] : choice) ?? fallback
        break
      }
    }
    result[index] = selected
  }
  return result
}
