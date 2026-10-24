import type * as Types from '@app/types.ts'

/**
 * Unpack bytes into bits.
 * @description Expands each byte into its individual bits.
 * @param bytes - Byte values to unpack
 * @param order - Byte order used for unpacking
 * @returns Bit values for every byte
 */
export default function unpack(
  bytes: number[],
  order: Types.NumerixOrder = 'big'
): number[] {
  const count = bytes.length
  const unpacked = new Array<number>(count << 3)
  let cursor = 0
  if (order === 'little') {
    for (let index = 0; index < count; index++) {
      const byte = bytes[index] ?? 0
      for (let offset = 0; offset < 8; offset++) {
        unpacked[cursor++] = (byte >> offset) & 1
      }
    }
    return unpacked
  }
  for (let index = 0; index < count; index++) {
    const byte = bytes[index] ?? 0
    for (let offset = 7; offset >= 0; offset--) {
      unpacked[cursor++] = (byte >> offset) & 1
    }
  }
  return unpacked
}
