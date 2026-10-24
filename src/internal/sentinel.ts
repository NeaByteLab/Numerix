import type * as Types from '@app/types.ts'

/**
 * Sentinel value for an extreme search.
 * @description Provides the identity for the smallest or largest search.
 * @param direction - Whether the smallest or largest entry wins
 * @returns Starting value for the search
 */
export default function sentinel(direction: Types.NumerixDirection): number {
  return direction === 'min' ? Infinity : -Infinity
}
