/**
 * Join characters with a separator.
 * @description Inserts a separator between every character.
 * @param separator - Separator placed between characters
 * @param text - String or array of strings to join
 * @returns Joined strings matching the input shape
 */
export default function join(
  separator: string,
  text: string | string[]
): string | string[] {
  if (!Array.isArray(text)) {
    return text.split('').join(separator)
  }
  const length = text.length
  const result = new Array<string>(length)
  for (let index = 0; index < length; index++) {
    result[index] = (text[index] ?? '').split('').join(separator)
  }
  return result
}
