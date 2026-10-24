import type * as Types from '@app/types.ts'

/**
 * Pack bits into bytes.
 * @description Groups bits into bytes using the requested order.
 * @param bits - Bit values to pack
 * @param order - Byte order used for packing
 * @returns Packed byte values
 */
export default function pack(
  bits: number[],
  order: Types.NumerixOrder = 'big'
): number[] {
  const length = bits.length
  const count = Math.ceil(length / 8)
  const packed = new Array<number>(count)
  const little = order === 'little'
  for (let index = 0; index < count; index++) {
    const start = index << 3
    let byte = 0
    if (little) {
      for (let offset = 0; offset < 8; offset++) {
        if (bits[start + offset]) {
          byte |= 1 << offset
        }
      }
    } else {
      for (let offset = 0; offset < 8; offset++) {
        if (bits[start + offset]) {
          byte |= 1 << (7 - offset)
        }
      }
    }
    packed[index] = byte
  }
  return packed
}
