/**
 * Swap the letter case.
 * @description Inverts uppercase and lowercase letters per character.
 * @param text - String whose case is inverted
 * @returns Case-swapped string
 */
function swapSingle(text: string): string {
  const length = text.length
  let result = ''
  for (let index = 0; index < length; index++) {
    const code = text.charCodeAt(index)
    if (code >= 65 && code <= 90) {
      result += String.fromCharCode(code + 32)
    } else if (code >= 97 && code <= 122) {
      result += String.fromCharCode(code - 32)
    } else {
      const character = text[index] ?? ''
      const upper = character.toUpperCase()
      result += character === upper ? character.toLowerCase() : upper
    }
  }
  return result
}

/**
 * Swap letter case in text.
 * @description Inverts uppercase and lowercase letters.
 * @param text - String or array of strings to convert
 * @returns Case-swapped strings matching the input shape
 */
export default function swapcase(text: string | string[]): string | string[] {
  if (Array.isArray(text)) {
    const length = text.length
    const result = new Array<string>(length)
    for (let index = 0; index < length; index++) {
      result[index] = swapSingle(text[index] ?? '')
    }
    return result
  }
  return swapSingle(text)
}
