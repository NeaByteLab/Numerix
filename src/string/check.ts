/** Default pattern used for unknown categories */
const fallback = /^[a-zA-Z0-9]+$/

/** Validation patterns keyed by category name */
const patterns: Record<string, RegExp> = {
  alnum: fallback,
  alpha: /^[a-zA-Z]+$/,
  decimal: /^[0-9]+$/,
  digit: /^[0-9]+$/,
  lower: /^(?=.*[a-z])[^A-Z]+$/s,
  numeric: /^[0-9]+$/,
  space: /^\s+$/,
  title: /^(?=.*[A-Za-z])(?![a-z])(?!.*[^A-Za-z][a-z])(?!.*[A-Za-z][A-Z]).+$/s,
  upper: /^(?=.*[A-Z])[^a-z]+$/s
}

/**
 * Test text against a character class.
 * @description Matches each string against a named validation pattern.
 * @param text - String or array of strings to test
 * @param kind - Character class used for the validation
 * @returns Match results matching the input shape
 */
export default function check(
  text: string | string[],
  kind:
    | 'alnum'
    | 'alpha'
    | 'decimal'
    | 'digit'
    | 'lower'
    | 'numeric'
    | 'space'
    | 'title'
    | 'upper' = 'alnum'
): boolean | boolean[] {
  const pattern = patterns[kind] ?? fallback
  if (!Array.isArray(text)) {
    return pattern.test(text)
  }
  const length = text.length
  const result = new Array<boolean>(length)
  for (let index = 0; index < length; index++) {
    result[index] = pattern.test(text[index] ?? '')
  }
  return result
}
