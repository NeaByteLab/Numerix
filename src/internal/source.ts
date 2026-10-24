import type * as Types from '@app/types.ts'
import * as Random from '@app/random/index.ts'

/** Shared generator used when no generator is supplied */
let shared: Types.NumerixGenerator | undefined

/**
 * Draw a uniform random sample.
 * @description Uses the given generator or a shared seeded generator.
 * @param generator - Optional generator supplying uniform samples
 * @returns Uniform sample within the unit interval
 */
export default function source(generator?: Types.NumerixGenerator): number {
  if (generator) {
    return generator.next()
  }
  if (!shared) {
    shared = Random.seed()
  }
  return shared.next()
}
