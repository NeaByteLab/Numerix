import type * as Types from '@app/types.ts'

/** Native byte order of the current machine */
const machine: 'LE' | 'BE' = (() => {
  const probe = new ArrayBuffer(2)
  new Uint16Array(probe)[0] = 0x0102
  return new Uint8Array(probe)[0] === 0x02 ? 'LE' : 'BE'
})()

/**
 * Inspect or swap byte order.
 * @description Reports endianness or reverses byte sequences.
 * @param bytes - Buffer or bytes whose order is inspected
 * @param swap - When true reverses the byte sequence
 * @returns Endianness descriptor or the swapped bytes
 */
export default function endian(
  bytes?: ArrayBufferView | number[],
  swap: boolean = false
): Types.NumerixEndian | number[] {
  if (swap && Array.isArray(bytes)) {
    const length = bytes.length
    const result = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      const entry = bytes[index] ?? 0
      result[index] = ((entry & 0xff) << 24) | ((entry & 0xff00) << 8) |
        ((entry >> 8) & 0xff00) | ((entry >>> 24) & 0xff)
    }
    return result
  }
  if (bytes && ArrayBuffer.isView(bytes)) {
    return { order: machine, byteLength: bytes.byteLength, byteOffset: bytes.byteOffset }
  }
  const length = Array.isArray(bytes) ? bytes.length * 8 : 0
  return { order: machine, byteLength: length, byteOffset: 0 }
}
