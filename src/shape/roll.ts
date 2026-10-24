/**
 * Roll array entries by an offset.
 * @description Moves entries from the end to the front.
 * @param input - Array whose entries are shifted
 * @param shift - Number of positions each entry moves
 * @returns Array containing the rolled entries
 * @template T - Type of the array values
 */
export default function roll<T>(input: T[], shift: number): T[] {
  const length = input.length
  if (length === 0) {
    return []
  }
  const offset = ((shift % length) + length) % length
  if (offset === 0) {
    return input.slice()
  }
  const result = new Array<T>(length)
  const split = length - offset
  let cursor = 0
  for (let index = split; index < length; index++) {
    result[cursor++] = input[index] as T
  }
  for (let index = 0; index < split; index++) {
    result[cursor++] = input[index] as T
  }
  return result
}
