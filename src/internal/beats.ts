import type * as Types from '@app/types.ts'

/**
 * Compare entries under a direction.
 * @description Returns true when the first entry beats the second.
 * @param first - Left entry
 * @param second - Right entry
 * @param direction - Whether the smallest or largest entry wins
 * @returns True when the first entry is the better extreme
 */
export default function beats(
  first: number,
  second: number,
  direction: Types.NumerixDirection
): boolean {
  if (first === 0 && second === 0) {
    return direction === 'min'
      ? Object.is(first, -0) && !Object.is(second, -0)
      : Object.is(second, -0) && !Object.is(first, -0)
  }
  return direction === 'min' ? first < second : first > second
}
