import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import info from '@app/dtype/info.ts'

/** Host machine byte order */
const machine: 'LE' | 'BE' = new Uint8Array(Uint16Array.of(0x0102).buffer)[0] === 0x02 ? 'LE' : 'BE'

/**
 * Inspect or swap byte order.
 * @description Reports endianness or reverses byte sequences.
 * @param bytes - Buffer or bytes whose order is inspected
 * @param reverse - When true, reverses the byte sequence
 * @returns Endianness descriptor or the swapped bytes
 */
export default function endian(
  bytes?:
    | ArrayBufferView
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  reverse: boolean = false
): Types.NumerixEndian | number[] | number[][] {
  if (reverse && Array.isArray(bytes)) {
    return Internal.mapper(
      bytes as number[] | number[][],
      (value = 0) =>
        ((value & 0xff) << 24) | ((value & 0xff00) << 8) |
        ((value >> 8) & 0xff00) | ((value >>> 24) & 0xff)
    ) as number[] | number[][]
  }
  if (bytes && ArrayBuffer.isView(bytes)) {
    if (reverse && !(bytes instanceof DataView)) {
      const width = (bytes as unknown as { BYTES_PER_ELEMENT: number }).BYTES_PER_ELEMENT
      const copied = new Uint8Array(
        bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
      )
      if (width > 1) {
        for (let offset = 0; offset < copied.length; offset += width) {
          for (let index = 0; index < width >> 1; index++) {
            const opposite = offset + width - 1 - index
            ;[copied[offset + index], copied[opposite]] = [
              copied[opposite] ?? 0,
              copied[offset + index] ?? 0
            ]
          }
        }
      }
      return Array.from(
        new (bytes.constructor as {
          new (buffer: ArrayBufferLike): ArrayLike<number | bigint>
        })(copied.buffer),
        (entry) => Number(entry ?? 0)
      )
    }
    return { order: machine, byteLength: bytes.byteLength, byteOffset: bytes.byteOffset }
  }
  return {
    order: machine,
    byteLength: Array.isArray(bytes) ? info(bytes).nbytes : 0,
    byteOffset: 0
  }
}
