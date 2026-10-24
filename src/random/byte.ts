import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw random bytes.
 * @description Fills a byte buffer with uniform random values.
 * @param length - Number of bytes to generate
 * @param generator - Generator supplying uniform samples
 * @returns Buffer of random byte values
 */
export default function byte(length: number, generator?: Types.NumerixGenerator): Uint8Array {
  const bytes = new Uint8Array(length)
  for (let index = 0; index < length; index++) {
    bytes[index] = Math.floor(Internal.source(generator) * 256)
  }
  return bytes
}
