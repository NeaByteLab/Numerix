import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Evaluate an Einstein summation expression.
 * @description Contracts array axes following a subscript formula.
 * @param subscripts - Index formula describing the contraction
 * @param first - First operand of the contraction
 * @param right - Second operand of the contraction
 * @returns Contracted values matching the requested output axes
 */
export default function einsum(
  subscripts: string,
  first:
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  right?:
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][]
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  const promote = Internal.classify(first, true, true) === true ||
    Internal.classify(right, true, true) === true
  const parts = subscripts.replace(/\s+/g, '').replace(/\.\.\./g, '').split('->')
  if (parts.length > 2) {
    throw new RangeError(`Unsupported or invalid einsum subscripts ${subscripts}`)
  }
  const inputs = (parts[0] ?? '').split(',')
  const operands = right === undefined ? [first] : [first, right]
  if (inputs.length !== operands.length) {
    throw new RangeError(`Unsupported or invalid einsum subscripts ${subscripts}`)
  }
  const extents = new Map<string, number>()
  const counts = new Map<string, number>()
  const shapes: number[][] = []
  for (let index = 0; index < operands.length; index++) {
    const label = inputs[index] ?? ''
    const operand = operands[index] ?? []
    if (!/^[a-zA-Z]+$/.test(label) || label.length > 2) {
      throw new RangeError(`Unsupported or invalid einsum subscripts ${subscripts}`)
    }
    let dimensions: number[]
    if (label.length === 1) {
      if (Array.isArray(operand[0])) {
        throw new RangeError(`Unsupported or invalid einsum subscripts ${subscripts}`)
      }
      dimensions = [operand.length]
    } else {
      if (operand.length > 0 && !Array.isArray(operand[0])) {
        throw new RangeError(`Unsupported or invalid einsum subscripts ${subscripts}`)
      }
      dimensions = operand.length === 0
        ? [0, 0]
        : [operand.length, (operand[0] as unknown[]).length]
    }
    shapes.push(dimensions)
    const local = new Map<string, number>()
    for (let level = 0; level < label.length; level++) {
      const symbol = label[level]!
      const extent = dimensions[level] ?? 0
      counts.set(symbol, (counts.get(symbol) ?? 0) + 1)
      if (local.has(symbol)) {
        if (local.get(symbol) !== extent) {
          throw new RangeError(
            `dimensions in operand ${index} for collapsing index '${symbol}' don't match`
          )
        }
      } else {
        local.set(symbol, extent)
      }
      if (extents.has(symbol)) {
        const previous = extents.get(symbol)!
        if (previous !== extent && previous !== 1 && extent !== 1) {
          throw new RangeError('operands could not be broadcast together')
        }
        extents.set(symbol, previous === 1 ? extent : previous)
      } else {
        extents.set(symbol, extent)
      }
    }
  }
  let output = parts[1] ?? ''
  if (parts[1] === undefined) {
    const unbound: string[] = []
    for (const [symbol, count] of counts) {
      if (count === 1) {
        unbound.push(symbol)
      }
    }
    output = unbound.sort().join('')
  }
  if (!/^[a-zA-Z]*$/.test(output) || output.length > 2) {
    throw new RangeError(`Unsupported or invalid einsum subscripts ${subscripts}`)
  }
  const visited = new Set<string>()
  for (let index = 0; index < output.length; index++) {
    const symbol = output[index]!
    if (visited.has(symbol) || !extents.has(symbol)) {
      throw new RangeError(`Unsupported or invalid einsum subscripts ${subscripts}`)
    }
    visited.add(symbol)
  }
  const contracted: number[] = []
  let limit = 1
  for (const [symbol, extent] of extents) {
    if (!visited.has(symbol)) {
      contracted.push(symbol.charCodeAt(0))
      limit *= extent
    }
  }
  const cursor = new Int32Array(123)
  const primary = inputs[0]!
  const secondary = inputs[1] ?? ''
  const major = primary.charCodeAt(0)
  const minor = primary.length > 1 ? primary.charCodeAt(1) : 0
  const upper = secondary.length > 0 ? secondary.charCodeAt(0) : 0
  const lower = secondary.length > 1 ? secondary.charCodeAt(1) : 0
  const front = output.length > 0 ? output.charCodeAt(0) : 0
  const final = output.length > 1 ? output.charCodeAt(1) : 0
  const bounds = Int32Array.from(
    contracted,
    (entry) => extents.get(String.fromCharCode(entry)) ?? 1
  )
  const table = Array.from(
    { length: output.length === 0 ? 1 : (extents.get(output[0]!) ?? 0) },
    (_outer, outer) => {
      if (front > 0) {
        cursor[front] = outer
      }
      return Array.from(
        { length: output.length < 2 ? 1 : (extents.get(output[1]!) ?? 0) },
        (_inner, column) => {
          if (final > 0) {
            cursor[final] = column
          }
          if (!promote) {
            let reals = 0
            for (let offset = 0; offset < limit; offset++) {
              let quotient = offset
              for (let depth = contracted.length - 1; depth >= 0; depth--) {
                const extent = bounds[depth] ?? 1
                cursor[contracted[depth]!] = quotient % extent
                quotient = Math.floor(quotient / extent)
              }
              const first = Number(
                (primary.length === 1
                  ? operands[0]![shapes[0]![0] === 1 ? 0 : (cursor[major] ?? 0)]
                  : (
                    operands[0]![shapes[0]![0] === 1 ? 0 : (cursor[major] ?? 0)] as
                      | unknown[]
                      | undefined
                  )?.[shapes[0]![1] === 1 ? 0 : (cursor[minor] ?? 0)]) ?? 0
              )
              if (operands.length === 1) {
                reals += first
              } else {
                reals += first *
                  Number(
                    (secondary.length === 1
                      ? operands[1]![shapes[1]![0] === 1 ? 0 : (cursor[upper] ?? 0)]
                      : (
                        operands[1]![shapes[1]![0] === 1 ? 0 : (cursor[upper] ?? 0)] as
                          | unknown[]
                          | undefined
                      )?.[shapes[1]![1] === 1 ? 0 : (cursor[lower] ?? 0)]) ?? 0
                  )
              }
            }
            return reals
          }
          let reals = 0
          let imags = 0
          for (let offset = 0; offset < limit; offset++) {
            let quotient = offset
            for (let depth = contracted.length - 1; depth >= 0; depth--) {
              const extent = bounds[depth] ?? 1
              cursor[contracted[depth]!] = quotient % extent
              quotient = Math.floor(quotient / extent)
            }
            const first = (primary.length === 1
              ? operands[0]![shapes[0]![0] === 1 ? 0 : (cursor[major] ?? 0)]
              : (
                operands[0]![shapes[0]![0] === 1 ? 0 : (cursor[major] ?? 0)] as
                  | unknown[]
                  | undefined
              )?.[shapes[0]![1] === 1 ? 0 : (cursor[minor] ?? 0)]) ?? 0
            const alpha = Internal.shape(first) ? first.re : Number(first)
            const gamma = Internal.shape(first) ? first.im : 0
            if (operands.length === 1) {
              reals += alpha
              imags += gamma
            } else {
              const other = (secondary.length === 1
                ? operands[1]![shapes[1]![0] === 1 ? 0 : (cursor[upper] ?? 0)]
                : (
                  operands[1]![shapes[1]![0] === 1 ? 0 : (cursor[upper] ?? 0)] as
                    | unknown[]
                    | undefined
                )?.[shapes[1]![1] === 1 ? 0 : (cursor[lower] ?? 0)]) ?? 0
              const omega = Internal.shape(other) ? other.re : Number(other)
              const extra = Internal.shape(other) ? other.im : 0
              reals += alpha * omega - gamma * extra
              imags += alpha * extra + gamma * omega
            }
          }
          return { re: reals, im: imags }
        }
      )
    }
  )
  return output.length === 0
    ? table[0]![0]!
    : output.length === 1
    ? (table.map((slice) => slice[0]!) as number[] | Types.NumerixComplex[])
    : (table as number[][] | Types.NumerixComplex[][])
}
