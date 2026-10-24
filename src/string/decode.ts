/** Shared UTF-8 text decoder */
const decoder = new TextDecoder('utf-8', { ignoreBOM: true })

/**
 * Decode bytes into text.
 * @description Converts byte buffers using UTF-8 encoding.
 * @param bytes - Byte buffer or array of buffers to decode
 * @returns Decoded strings matching the input shape
 */
export default function decode(bytes: Uint8Array | Uint8Array[]): string | string[] {
  if (Array.isArray(bytes)) {
    const length = bytes.length
    const result = new Array<string>(length)
    for (let index = 0; index < length; index++) {
      result[index] = decoder.decode(bytes[index])
    }
    return result
  }
  return decoder.decode(bytes)
}
