import * as Internal from '@app/internal/index.ts'

/**
 * Roll array entries by an offset.
 * @description Moves entries from the end to the front.
 * @template T - Type of the array values
 * @param input - Array whose entries are shifted
 * @param offset - Number of positions each entry moves
 * @param level - Optional axis or axes along which entries are shifted
 * @returns Array containing the rolled entries
 */
export default function roll<T>(
  input: T[],
  offset: number | number[],
  level?: number | number[] | null
): T[] {
  if (Array.isArray(offset) || Array.isArray(level)) {
    if (level === undefined || level === null) {
      let total = 0
      if (Array.isArray(offset)) {
        for (let index = 0; index < offset.length; index++) {
          total += offset[index] ?? 0
        }
      } else {
        total = offset
      }
      return roll(input, total)
    }
    const amounts = Array.isArray(offset) ? offset : [offset]
    const chosen = Array.isArray(level) ? level : [level]
    if (amounts.length !== chosen.length && amounts.length !== 1 && chosen.length !== 1) {
      throw new RangeError('shifts and axes must be broadcastable to a single shape')
    }
    let current = input
    for (
      let index = 0;
      index < (amounts.length === 1 ? chosen.length : amounts.length);
      index++
    ) {
      current = roll(
        current,
        amounts[amounts.length === 1 ? 0 : index] ?? 0,
        chosen[chosen.length === 1 ? 0 : index] ?? 0
      )
    }
    return current
  }
  const vector = !Array.isArray(input[0])
  if (!vector && (level === undefined || level === null)) {
    const matrix = input as unknown as unknown[][]
    const height = matrix.length
    const width = matrix[0]?.length ?? 0
    const total = height * width
    const distance = total === 0 ? 0 : ((offset % total) + total) % total
    const result = Array.from(
      { length: height },
      (_outer, outer) =>
        Array.from({ length: width }, (_inner, inner) => {
          const position = (outer * width + inner - distance + total) % total
          return matrix[Math.floor(position / width)]?.[position % width]
        })
    )
    return (
      Internal.classify(input, true, true) === true ? Internal.nested(result) : result
    ) as unknown as T[]
  }
  const normalized = level === undefined || level === null
    ? 0
    : level < 0
    ? (vector ? 1 : 2) + level
    : level
  if (normalized < 0 || normalized >= (vector ? 1 : 2)) {
    throw new RangeError(`axis is out of bounds for array of dimension ${vector ? 1 : 2}`)
  }
  if (!vector && normalized === 1) {
    return (input as unknown as unknown[][]).map((slice) =>
      roll(slice ?? [], offset)
    ) as unknown as T[]
  }
  const length = input.length
  const distance = length === 0 ? 0 : ((offset % length) + length) % length
  const shifted = distance === 0
    ? input.slice()
    : input.slice(length - distance).concat(input.slice(0, length - distance))
  return (
    Internal.classify(input, true, true) === true
      ? Internal.nested(shifted)
      : (vector ? shifted : shifted.map((entry) => (entry as unknown[]).slice() as unknown as T))
  ) as unknown as T[]
}
