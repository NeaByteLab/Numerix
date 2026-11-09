import * as Internal from '@app/internal/index.ts'

/** Shared UTF-8 encoder instance */
const encoder = new TextEncoder()

/**
 * Encode text into bytes.
 * @description Converts a string into a UTF-8 byte buffer.
 * @param input - String to encode
 * @returns UTF-8 byte buffer
 */
export default function encode(input: string): Uint8Array
/**
 * Encode a string vector into bytes.
 * @description Converts a vector of strings into UTF-8 byte buffers.
 * @param input - Vector of strings to encode
 * @returns Vector of byte buffers
 */
export default function encode(input: string[]): Uint8Array[]
/**
 * Encode a string matrix into bytes.
 * @description Converts a matrix of strings into UTF-8 byte buffers.
 * @param input - Matrix of strings to encode
 * @returns Matrix of byte buffers
 */
export default function encode(input: string[][]): Uint8Array[][]
/**
 * Encode text into bytes.
 * @description Converts strings into UTF-8 byte buffers.
 * @param input - String, vector, or matrix of strings to encode
 * @returns Byte buffers matching the input shape
 */
export default function encode(
  input: string | string[] | string[][]
): Uint8Array | Uint8Array[] | Uint8Array[][]
/**
 * Encode text into bytes.
 * @description Converts strings into UTF-8 byte buffers.
 * @param input - String, vector, or matrix of strings to encode
 * @returns Byte buffers matching the input shape
 */
export default function encode(
  input: string | string[] | string[][]
): Uint8Array | Uint8Array[] | Uint8Array[][] {
  return Internal.mapper(input, (value) => encoder.encode(value ?? ''))
}
