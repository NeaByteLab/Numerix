/** Pattern matching tab characters */
const tab = /\t/g

/**
 * Expand tab characters in one string.
 * @description Replaces tab stops with spaces up to the width.
 * @param text - String to expand
 * @param width - Column width of each tab stop
 * @returns Expanded string
 */
function expandTabs(text: string, width: number): string {
  if (width <= 0) {
    return text.replace(tab, '')
  }
  let result = ''
  let column = 0
  for (let index = 0; index < text.length; index++) {
    const character = text.charAt(index)
    if (character === '\t') {
      const spaces = width - (column % width)
      result += ' '.repeat(spaces)
      column += spaces
    } else {
      result += character
      if (character === '\n' || character === '\r') {
        column = 0
      } else {
        column++
      }
    }
  }
  return result
}

/**
 * Expand tab characters in text.
 * @description Replaces tab stops with spaces up to the width.
 * @param text - String or array of strings to expand
 * @param width - Column width of each tab stop
 * @returns Expanded strings matching the input shape
 */
export default function pad(text: string | string[], width: number = 8): string | string[] {
  if (!Array.isArray(text)) {
    return expandTabs(text, width)
  }
  const length = text.length
  const result = new Array<string>(length)
  for (let index = 0; index < length; index++) {
    result[index] = expandTabs(text[index] ?? '', width)
  }
  return result
}
