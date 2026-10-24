/**
 * Replace occurrences within text.
 * @description Swaps every match of the search string.
 * @param text - String or array of strings to update
 * @param search - Substring whose occurrences are replaced
 * @param replace - Replacement text inserted for each match
 * @returns Updated strings matching the input shape
 */
export default function replace(
  text: string | string[],
  search: string,
  replace: string
): string | string[] {
  if (!Array.isArray(text)) {
    return text.replaceAll(search, replace)
  }
  const length = text.length
  const result = new Array<string>(length)
  for (let index = 0; index < length; index++) {
    result[index] = (text[index] ?? '').replaceAll(search, replace)
  }
  return result
}
