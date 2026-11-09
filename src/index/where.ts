import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Select values using a condition.
 * @description Reports positions or picks values where the condition holds.
 * @template T - Type of the selected values
 * @param condition - Conditions deciding which values are used
 * @param first - Value used where the condition holds
 * @param second - Value used where the condition fails
 * @param policy - Reporting mode for the selected positions
 * @returns Selected values or matching positions
 */
export default function where<T = number>(
  condition: boolean | number | (boolean | number)[] | (boolean | number)[][],
  first?:
    | T[]
    | T[][]
    | T
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  second?:
    | T[]
    | T[][]
    | T
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  policy: Types.NumerixWhere = 'index'
):
  | T
  | T[]
  | T[][]
  | number
  | number[]
  | number[][]
  | number[][][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  if (policy !== 'index' && policy !== 'flat' && policy !== 'coord') {
    throw new RangeError("mode must be one of 'index', 'flat', or 'coord'")
  }
  if ((first === undefined) !== (second === undefined)) {
    throw new RangeError('either both or neither of x and y should be given')
  }
  if (first !== undefined && second !== undefined) {
    const complex = Internal.classify(first, true, true) === true ||
      Internal.classify(second, true, true) === true
    if (
      !Array.isArray(condition) &&
      !Array.isArray(first) &&
      !Array.isArray(second)
    ) {
      const picked = Internal.settle('any', condition) ? first : second
      return (complex ? Internal.nested(picked) : picked) as T
    }
    if (
      (Array.isArray(condition) && Array.isArray(condition[0])) ||
      (Array.isArray(first) && Array.isArray(first[0])) ||
      (Array.isArray(second) && Array.isArray(second[0]))
    ) {
      const checks = !Array.isArray(condition)
        ? [[condition]]
        : Array.isArray(condition[0])
        ? (condition as (boolean | number)[][])
        : [condition as (boolean | number)[]]
      const primary = !Array.isArray(first)
        ? [[first]]
        : Array.isArray(first[0])
        ? (first as unknown[][])
        : [first as unknown[]]
      const secondary = !Array.isArray(second)
        ? [[second]]
        : Array.isArray(second[0])
        ? (second as unknown[][])
        : [second as unknown[]]
      const extent = checks.length === 1 ? primary.length : checks.length
      if (checks.length !== primary.length && checks.length !== 1 && primary.length !== 1) {
        throw new RangeError('operands could not be broadcast together')
      }
      if (extent !== secondary.length && extent !== 1 && secondary.length !== 1) {
        throw new RangeError('operands could not be broadcast together')
      }
      const result = Array.from(
        { length: extent === 1 ? secondary.length : extent },
        (_outer, outer) => {
          const flags = checks[checks.length === 1 ? 0 : outer] ?? []
          const alpha = primary[primary.length === 1 ? 0 : outer] ?? []
          const omega = secondary[secondary.length === 1 ? 0 : outer] ?? []
          const columns = flags.length === 1 ? alpha.length : flags.length
          if (flags.length !== alpha.length && flags.length !== 1 && alpha.length !== 1) {
            throw new RangeError('operands could not be broadcast together')
          }
          if (columns !== omega.length && columns !== 1 && omega.length !== 1) {
            throw new RangeError('operands could not be broadcast together')
          }
          return Array.from(
            { length: columns === 1 ? omega.length : columns },
            (_inner, column) =>
              (Internal.settle('any', flags[flags.length === 1 ? 0 : column])
                ? alpha[alpha.length === 1 ? 0 : column]
                : omega[omega.length === 1 ? 0 : column]) as T
          )
        }
      )
      return complex ? (Internal.nested(result) as unknown as T[][]) : result
    }
    const flags = Array.isArray(condition) ? condition : [condition]
    const primary = Array.isArray(first) ? first : [first]
    const secondary = Array.isArray(second) ? second : [second]
    const extent = flags.length === 1 ? primary.length : flags.length
    if (flags.length !== primary.length && flags.length !== 1 && primary.length !== 1) {
      throw new RangeError('operands could not be broadcast together')
    }
    if (extent !== secondary.length && extent !== 1 && secondary.length !== 1) {
      throw new RangeError('operands could not be broadcast together')
    }
    const result = Array.from(
      { length: extent === 1 ? secondary.length : extent },
      (_outer, index) =>
        (Internal.settle('any', flags[flags.length === 1 ? 0 : index])
          ? primary[primary.length === 1 ? 0 : index]
          : secondary[secondary.length === 1 ? 0 : index]) as T
    )
    return complex ? (Internal.nested(result) as unknown as T[]) : result
  }
  if (!Array.isArray(condition)) {
    return where([condition], undefined, undefined, policy) as number[] | number[][]
  }
  if (Array.isArray(condition[0])) {
    const matrix = condition as (boolean | number)[][]
    const width = matrix[0]?.length ?? 0
    if (policy === 'flat') {
      const matches: number[] = []
      for (let outer = 0; outer < matrix.length; outer++) {
        const slice = matrix[outer] ?? []
        for (let column = 0; column < slice.length; column++) {
          if (Internal.settle('any', slice[column])) {
            matches.push(outer * width + column)
          }
        }
      }
      return matches
    }
    if (policy === 'coord') {
      const pairs: number[][] = []
      for (let outer = 0; outer < matrix.length; outer++) {
        const slice = matrix[outer] ?? []
        for (let column = 0; column < slice.length; column++) {
          if (Internal.settle('any', slice[column])) {
            pairs.push([outer, column])
          }
        }
      }
      return pairs
    }
    const vertical: number[] = []
    const columns: number[] = []
    for (let outer = 0; outer < matrix.length; outer++) {
      const slice = matrix[outer] ?? []
      for (let column = 0; column < slice.length; column++) {
        if (Internal.settle('any', slice[column])) {
          vertical.push(outer)
          columns.push(column)
        }
      }
    }
    return [vertical, columns]
  }
  const indices: number[] = []
  for (let index = 0; index < (condition as (boolean | number)[]).length; index++) {
    if (Internal.settle('any', (condition as (boolean | number)[])[index])) {
      indices.push(index)
    }
  }
  return policy === 'coord'
    ? indices.map((index) => [index])
    : policy === 'index'
    ? [indices]
    : indices
}
