import * as Internal from '@app/internal/index.ts'

/**
 * Capitalize the first letter of text.
 * @description Uppercases the first character and lowers the remainder.
 * @param input - String to capitalize
 * @param titled - When true, capitalizes each word separately
 * @returns Capitalized string
 */
export default function capitalize(
  input: string,
  titled?: boolean | 'title'
): string
/**
 * Capitalize a vector of strings.
 * @description Uppercases the first character of each string entry.
 * @param input - Vector of strings to capitalize
 * @param titled - When true, capitalizes each word separately
 * @returns Vector of capitalized strings
 */
export default function capitalize(
  input: string[],
  titled?: boolean | 'title'
): string[]
/**
 * Capitalize a matrix of strings.
 * @description Uppercases the first character of each matrix entry.
 * @param input - Matrix of strings to capitalize
 * @param titled - When true, capitalizes each word separately
 * @returns Matrix of capitalized strings
 */
export default function capitalize(
  input: string[][],
  titled?: boolean | 'title'
): string[][]
/**
 * Capitalize the first letter of text.
 * @description Uppercases the first character and lowers the remainder.
 * @param input - String, vector, or matrix of strings to capitalize
 * @param titled - When true, capitalizes each word separately
 * @returns Capitalized strings matching the input shape
 */
export default function capitalize(
  input: string | string[] | string[][],
  titled?: boolean | 'title'
): string | string[] | string[][]
/**
 * Capitalize the first letter of text.
 * @description Uppercases the first character and lowers the remainder.
 * @param input - String, vector, or matrix of strings to capitalize
 * @param titled - When true, capitalizes each word separately
 * @returns Capitalized strings matching the input shape
 */
export default function capitalize(
  input: string | string[] | string[][],
  titled: boolean | 'title' = false
): string | string[] | string[][] {
  return Internal.mapper(input, (value) => {
    const source = value ?? ''
    if (!source) {
      return source
    }
    if (titled) {
      return source.toLowerCase().replace(
        /(^|[^\p{Cased}])(\p{Cased})/gu,
        (_full: string, prefix: string, letter: string) => prefix + letter.toUpperCase()
      )
    }
    const width = (source.codePointAt(0) ?? 0) > 0xffff ? 2 : 1
    return source.slice(0, width).toUpperCase() + source.slice(width).toLowerCase()
  })
}
