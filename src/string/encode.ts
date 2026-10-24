/** Shared UTF-8 text encoder */
const encoder = new TextEncoder()

/**
 * Encode text into bytes.
 * @description Converts strings into UTF-8 byte buffers.
 * @param text - String or array of strings to encode
 * @returns Byte buffers matching the input shape
 */
export default function encode(text: string | string[]): Uint8Array | Uint8Array[] {
  if (Array.isArray(text)) {
    const length = text.length
    const result = new Array<Uint8Array>(length)
    for (let index = 0; index < length; index++) {
      result[index] = encoder.encode(text[index] ?? '')
    }
    return result
  }
  return encoder.encode(text)
}
