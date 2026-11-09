import * as Internal from '@app/internal/index.ts'

/**
 * Swap letter case in text.
 * @description Inverts uppercase and lowercase letters in a string.
 * @param input - String to convert
 * @returns Case-swapped string
 */
export default function swapcase(input: string): string
/**
 * Swap letter case in a string vector.
 * @description Inverts uppercase and lowercase letters across a vector.
 * @param input - Vector of strings to convert
 * @returns Vector of case-swapped strings
 */
export default function swapcase(input: string[]): string[]
/**
 * Swap letter case in a string matrix.
 * @description Inverts uppercase and lowercase letters across a matrix.
 * @param input - Matrix of strings to convert
 * @returns Matrix of case-swapped strings
 */
export default function swapcase(input: string[][]): string[][]
/**
 * Swap letter case in text.
 * @description Inverts uppercase and lowercase letters.
 * @param input - String, vector, or matrix of strings to convert
 * @returns Case-swapped strings matching the input shape
 */
export default function swapcase(
  input: string | string[] | string[][]
): string | string[] | string[][]
/**
 * Swap letter case in text.
 * @description Inverts uppercase and lowercase letters.
 * @param input - String, vector, or matrix of strings to convert
 * @returns Case-swapped strings matching the input shape
 */
export default function swapcase(
  input: string | string[] | string[][]
): string | string[] | string[][] {
  return Internal.mapper(input, (value) => {
    const source = value ?? ''
    let output = ''
    for (let index = 0; index < source.length; index++) {
      const point = source.charCodeAt(index)
      if (point >= 65 && point <= 90) {
        output += String.fromCharCode(point + 32)
      } else if (point >= 97 && point <= 122) {
        output += String.fromCharCode(point - 32)
      } else if (point === 931) {
        output += /\p{Cased}[\p{Case_Ignorable}]*$/u.test(source.slice(0, index)) &&
            !/^[\p{Case_Ignorable}]*\p{Cased}/u.test(source.slice(index + 1))
          ? 'ς'
          : 'σ'
      } else {
        const astral = point >= 0xd800 && point <= 0xdbff && index + 1 < source.length &&
          source.charCodeAt(index + 1) >= 0xdc00 && source.charCodeAt(index + 1) <= 0xdfff
        const character = astral ? source.slice(index, index + 2) : source.charAt(index)
        if (astral) {
          index++
        }
        output += /^\p{Uppercase}$/u.test(character)
          ? character.toLowerCase()
          : /^\p{Lowercase}$/u.test(character)
          ? character.toUpperCase()
          : character
      }
    }
    return output
  })
}
