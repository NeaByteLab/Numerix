import * as Internal from '@app/internal/index.ts'

/** Validation patterns keyed by category name */
const patterns: Record<string, RegExp> = {
  /** Alphanumeric character pattern */
  alnum: /^[\p{L}\p{N}]+$/u,
  /** Alphabetic character pattern */
  alpha: /^\p{L}+$/u,
  /** Decimal character pattern */
  decimal: /^\p{Nd}+$/u,
  /** Digit character pattern */
  digit:
    /^[\p{Nd}\u00b2\u00b3\u00b9\u1369-\u1371\u19da\u2070\u2074-\u2079\u2080-\u2089\u2460-\u2468\u2474-\u247c\u2488-\u2490\u24ea\u24f5-\u24fd\u24ff\u2776-\u277e\u2780-\u2788\u278a-\u2792\u{10a40}-\u{10a43}\u{10e60}-\u{10e68}\u{11052}-\u{1105a}\u{1f100}-\u{1f10a}]+$/u,
  /** Lowercase character pattern */
  lower: /^(?=.*\p{Lowercase})[^\p{Uppercase}\p{Lt}]+$/su,
  /** Numeric character pattern */
  numeric: /^\p{N}+$/u,
  /** Whitespace character pattern */
  space: /^\s+$/,
  /** Titlecase character pattern */
  title:
    /^(?=.*[\p{Uppercase}\p{Lt}])(?!\p{Lowercase})(?!.*[^\p{Cased}]\p{Lowercase})(?!.*\p{Cased}[\p{Uppercase}\p{Lt}]).+$/su,
  /** Uppercase character pattern */
  upper: /^(?=.*\p{Uppercase})[^\p{Lowercase}\p{Lt}]+$/su
}

/** Character class validation kind */
type Category =
  | 'alnum'
  | 'alpha'
  | 'decimal'
  | 'digit'
  | 'lower'
  | 'numeric'
  | 'space'
  | 'title'
  | 'upper'

/**
 * Test text against a character class.
 * @description Matches a string against a named validation pattern.
 * @param input - String to test
 * @param category - Character class used for the validation
 * @returns Match result for the string
 */
export default function check(input: string, category?: Category): boolean
/**
 * Test a string vector against a character class.
 * @description Matches each vector string against a validation pattern.
 * @param input - Vector of strings to test
 * @param category - Character class used for the validation
 * @returns Vector of match results
 */
export default function check(input: string[], category?: Category): boolean[]
/**
 * Test a string matrix against a character class.
 * @description Matches each matrix string against a validation pattern.
 * @param input - Matrix of strings to test
 * @param category - Character class used for the validation
 * @returns Matrix of match results
 */
export default function check(input: string[][], category?: Category): boolean[][]
/**
 * Test text against a character class.
 * @description Matches each string against a named validation pattern.
 * @param input - String, vector, or matrix of strings to test
 * @param category - Character class used for the validation
 * @returns Match results matching the input shape
 */
export default function check(
  input: string | string[] | string[][],
  category?: Category
): boolean | boolean[] | boolean[][]
/**
 * Test text against a character class.
 * @description Matches each string against a named validation pattern.
 * @param input - String, vector, or matrix of strings to test
 * @param category - Character class used for the validation
 * @returns Match results matching the input shape
 */
export default function check(
  input: string | string[] | string[][],
  category: Category = 'alnum'
): boolean | boolean[] | boolean[][] {
  const pattern = patterns[category]
  if (!pattern) {
    throw new RangeError(
      "kind must be one of 'alnum', 'alpha', 'decimal', 'digit', 'lower', 'numeric', 'space', 'title', or 'upper'"
    )
  }
  return Internal.mapper(input, (value) => pattern.test(value ?? ''))
}
