import type * as Types from '@app/types.ts'
import source from '@app/internal/source.ts'

/**
 * Draw one standard normal deviate.
 * @description Produces a deviate through the Box-Muller transform.
 * @param generator - Generator supplying uniform samples
 * @returns Single standard normal deviate
 */
export default function deviate(
  generator?: Types.NumerixGenerator
): number {
  let uniform = 0
  let value = 0
  while (uniform === 0) {
    uniform = source(generator)
  }
  while (value === 0) {
    value = source(generator)
  }
  return Math.sqrt(-2 * Math.log(uniform)) * Math.cos(2 * Math.PI * value)
}
