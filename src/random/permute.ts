import type * as Types from '@app/types.ts'
import shuffle from '@app/random/shuffle.ts'

/**
 * Randomly permute values.
 * @description Shuffles an array or generates a random permutation.
 * @param input - Array to permute or permutation length
 * @param generator - Generator supplying uniform samples
 * @returns Array of permuted values
 * @template T - Type of the permuted values
 */
export default function permute<T = number>(
  input: number | T[],
  generator?: Types.NumerixGenerator
): T[] {
  if (typeof input === 'number') {
    const values = new Array<T>(input)
    for (let index = 0; index < input; index++) {
      values[index] = index as unknown as T
    }
    return shuffle(values, generator)
  }
  return shuffle(input.slice(), generator)
}
