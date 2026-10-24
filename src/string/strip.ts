/**
 * Remove whitespace from text.
 * @description Trims characters from one or both ends.
 * @param text - String or array of strings to trim
 * @param mode - Side or sides that are trimmed
 * @returns Trimmed strings matching the input shape
 */
export default function strip(
  text: string | string[],
  mode: 'both' | 'left' | 'right' = 'both'
): string | string[] {
  if (!Array.isArray(text)) {
    return stripText(text, mode)
  }
  const length = text.length
  const result = new Array<string>(length)
  for (let index = 0; index < length; index++) {
    result[index] = stripText(text[index] ?? '', mode)
  }
  return result
}

/**
 * Remove whitespace from one string.
 * @description Trims characters from one or both ends.
 * @param text - String to trim
 * @param mode - Side or sides that are trimmed
 * @returns Trimmed string
 */
function stripText(text: string, mode: 'both' | 'left' | 'right'): string {
  if (mode === 'left') {
    return text.trimStart()
  }
  if (mode === 'right') {
    return text.trimEnd()
  }
  return text.trim()
}
