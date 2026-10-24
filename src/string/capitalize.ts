/** Pattern matching the first letter of each word */
const start = /\b\w/g

/**
 * Capitalize the first letter of text.
 * @description Uppercases the first character and lowers the remainder.
 * @param text - String or array of strings to capitalize
 * @param title - When true capitalizes each word separately
 * @returns Capitalized strings matching the input shape
 */
export default function capitalize(
  text: string | string[],
  title: boolean = false
): string | string[] {
  if (!Array.isArray(text)) {
    return capitalizeText(text, title)
  }
  const length = text.length
  const result = new Array<string>(length)
  for (let index = 0; index < length; index++) {
    result[index] = capitalizeText(text[index] ?? '', title)
  }
  return result
}

/**
 * Capitalize one string.
 * @description Uppercases the first letter and lowers the remainder.
 * @param text - String to capitalize
 * @param title - When true capitalizes each word separately
 * @returns Capitalized string
 */
function capitalizeText(text: string, title: boolean): string {
  if (!text) {
    return text
  }
  if (title) {
    return text.replace(start, (character) => character.toUpperCase())
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
