import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Select values using a condition.
 * @description Chooses between alternatives using the given conditions.
 * @template T - Type of the selectable values
 * @param conditions - Conditions deciding which choice is taken
 * @param choices - Alternative values available to select
 * @param fallback - Value used when no choice applies
 * @param policy - Selection mode applied to the conditions
 * @param level - Optional axis for two-dimensional compress mode
 * @returns Selected values for each condition
 */
export default function select<T = number>(
  conditions: (boolean | number)[] | (boolean | number)[][] | (boolean | number)[][][],
  choices: (
    | T[][]
    | T[]
    | T
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
  )[],
  fallback: T | number | Types.NumerixComplex = 0 as unknown as T,
  policy: Types.NumerixSelect = 'select',
  level?: number
): T[] | T[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (
    policy !== 'select' &&
    policy !== 'choose' &&
    policy !== 'compress' &&
    policy !== 'extract'
  ) {
    throw new RangeError("mode must be one of 'select', 'choose', 'compress', or 'extract'")
  }
  if (policy === 'choose' && choices.length === 0) {
    throw new RangeError('0-length sequence')
  }
  if (policy === 'select' && conditions.length === 0) {
    throw new RangeError('select with an empty condition list is not possible')
  }
  const spare = fallback as T
  let output: T[] | T[][]
  if (policy === 'extract') {
    const values = Array.isArray(choices[0]) ? Shape.flatten<T>(choices) : (choices as T[])
    const flags = Array.isArray(conditions[0])
      ? Shape.flatten<boolean | number>(conditions)
      : (conditions as (boolean | number)[])
    output = []
    for (let index = 0; index < flags.length; index++) {
      if (Internal.settle('any', flags[index])) {
        if (index >= values.length) {
          throw new RangeError('index is out of bounds for axis 0')
        }
        ;(output as T[]).push(values[index] as T)
      }
    }
  } else if (policy === 'compress') {
    const flags = conditions as (boolean | number)[]
    const matrix = Array.isArray(choices[0])
    const resolved = level === undefined ? undefined : level < 0 ? (matrix ? 2 : 1) + level : level
    if (resolved !== undefined && (resolved < 0 || resolved >= (matrix ? 2 : 1))) {
      throw new RangeError('axis out of bounds')
    }
    if (matrix && resolved === 1) {
      if (flags.length > ((choices as T[][])[0]?.length ?? 0)) {
        throw new RangeError('mask is out of bounds for axis 1')
      }
      output = (choices as T[][]).map((outer) =>
        select(flags, outer as T[], fallback, 'compress') as T[]
      )
    } else {
      const values = matrix && resolved === undefined ? Shape.flatten<T>(choices) : choices
      if (flags.length > values.length) {
        throw new RangeError('mask is out of bounds for axis 0')
      }
      output = []
      for (let index = 0; index < flags.length; index++) {
        if (Internal.settle('any', flags[index])) {
          const entry = values[index]
          ;(output as unknown[]).push(Array.isArray(entry) ? (entry as T[]).slice() : (entry as T))
        }
      }
    }
  } else if (
    !Array.isArray(conditions[0]) &&
    policy !== 'choose' &&
    !(typeof conditions[0] === 'number' && Array.isArray(choices[0]))
  ) {
    const values = conditions as (boolean | number)[]
    output = Array.from(
      { length: values.length },
      (_outer, index) =>
        Internal.settle('any', values[index]) ? ((choices as T[])[index] ?? spare) : spare
    )
  } else {
    const choosing = policy === 'choose' || !Array.isArray(conditions[0])
    const volume = choosing
      ? [
        (Array.isArray(conditions[0]) ? conditions : [conditions]) as (boolean | number)[][]
      ]
      : (Array.isArray((conditions as unknown[][])[0]?.[0])
        ? (conditions as (boolean | number)[][][])
        : (conditions as (boolean | number)[][]).map((entry) => [entry]))
    const count = volume.length
    if (!choosing && count !== choices.length) {
      throw new RangeError('list of cases must be same length as list of conditions')
    }
    let height = 1
    let width = 1
    for (const group of [volume, choices]) {
      for (const entry of group) {
        if (Array.isArray(entry)) {
          const nested = Array.isArray(entry[0]) ? (entry as unknown[][]) : [entry as unknown[]]
          if (height !== 1 && nested.length !== 1 && nested.length !== height) {
            throw new RangeError('shape mismatch objects cannot be broadcast to a single shape')
          }
          if (height === 1) {
            height = nested.length
          }
          for (const slice of nested) {
            if (width !== 1 && slice.length !== 1 && slice.length !== width) {
              throw new RangeError('shape mismatch objects cannot be broadcast to a single shape')
            }
            if (width === 1) {
              width = slice.length
            }
          }
        }
      }
    }
    const matrix = Array.from(
      { length: height },
      (_outer, outer) =>
        Array.from({ length: width }, (_inner, column) => {
          let chosen = -1
          if (choosing) {
            const slice = volume[0]![volume[0]!.length === 1 ? 0 : outer] ?? []
            const choice = (slice[slice.length === 1 ? 0 : column] ?? 0) as number
            if (!Number.isInteger(choice) || choice < 0 || choice >= choices.length) {
              throw new RangeError('invalid entry in choice array')
            }
            chosen = choice
          } else {
            for (let index = 0; index < count; index++) {
              const conds = volume[index] ?? []
              const active = conds[conds.length === 1 ? 0 : outer] ?? []
              if (Internal.settle('any', active[active.length === 1 ? 0 : column])) {
                chosen = index
                break
              }
            }
          }
          if (chosen === -1) {
            return spare
          }
          const option = choices[chosen]
          const source = Array.isArray(option)
            ? (Array.isArray(option[0])
              ? ((option as T[][])[option.length === 1 ? 0 : outer] ?? [])
              : (option as T[]))
            : null
          return (source ? source[source.length === 1 ? 0 : column] : (option as T)) ?? spare
        })
    )
    let layered = false
    for (let index = 0; index < choices.length; index++) {
      const option = choices[index]
      if (Array.isArray(option) && Array.isArray(option[0])) {
        layered = true
        break
      }
    }
    output = ((!Array.isArray(conditions[0]) || (!choosing && !Array.isArray(conditions[0][0]))) &&
        !layered)
      ? (matrix[0] ?? [])
      : matrix
  }
  return Internal.classify(choices, true, true) === true ||
      (policy !== 'compress' && policy !== 'extract' &&
        Internal.classify(spare, true, true) === true)
    ? (Internal.nested(output) as unknown as T[] | T[][])
    : output
}
