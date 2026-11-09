import type * as Types from '@app/types.ts'
import * as Create from '@app/create/index.ts'
import shuffle from '@app/random/shuffle.ts'

/**
 * Randomly permute values.
 * @description Shuffles an array or generates a random permutation.
 * @template T - Type of the permuted values
 * @param input - Array to permute or permutation length
 * @param generator - Generator supplying uniform samples
 * @returns Array of permuted values
 */
export default function permute<T = number>(
  input: number | T[],
  generator?: Types.NumerixGenerator
): T[] {
  if (typeof input === 'number') {
    return input <= 0
      ? []
      : shuffle(Array.from({ length: input }, (_outer, index) => index as unknown as T), generator)
  }
  return shuffle(Create.copy(input), generator)
}
