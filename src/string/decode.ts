import * as Internal from '@app/internal/index.ts'

/** Shared UTF-8 decoder instance */
const decoder = new TextDecoder('utf-8', { ignoreBOM: true })

/**
 * Decode bytes into text.
 * @description Converts a byte buffer using UTF-8 encoding.
 * @param buffer - Byte buffer to decode
 * @returns Decoded string
 */
export default function decode(buffer: Uint8Array): string
/**
 * Decode byte vectors into text.
 * @description Converts a vector of byte buffers using UTF-8 encoding.
 * @param buffer - Vector of byte buffers to decode
 * @returns Vector of decoded strings
 */
export default function decode(buffer: Uint8Array[]): string[]
/**
 * Decode byte matrices into text.
 * @description Converts a matrix of byte buffers using UTF-8 encoding.
 * @param buffer - Matrix of byte buffers to decode
 * @returns Matrix of decoded strings
 */
export default function decode(buffer: Uint8Array[][]): string[][]
/**
 * Decode bytes into text.
 * @description Converts byte buffers using UTF-8 encoding.
 * @param buffer - Byte buffer, vector, or matrix of buffers to decode
 * @returns Decoded strings matching the input shape
 */
export default function decode(
  buffer: Uint8Array | Uint8Array[] | Uint8Array[][]
): string | string[] | string[][]
/**
 * Decode bytes into text.
 * @description Converts byte buffers using UTF-8 encoding.
 * @param buffer - Byte buffer, vector, or matrix of buffers to decode
 * @returns Decoded strings matching the input shape
 */
export default function decode(
  buffer: Uint8Array | Uint8Array[] | Uint8Array[][]
): string | string[] | string[][] {
  return Internal.mapper(buffer, (value) => decoder.decode(value))
}
