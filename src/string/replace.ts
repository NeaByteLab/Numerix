import * as Internal from '@app/internal/index.ts'

/**
 * Replace occurrences within text.
 * @description Swaps every match of the search string.
 * @param input - String or array of strings to update
 * @param search - Substring whose occurrences are replaced
 * @param change - Replacement text inserted for each match
 * @param limit - Optional maximum number of occurrences replaced
 * @returns Updated strings matching the input shape
 */
export default function replace(
  input: string | string[] | string[][],
  search: string | string[] | string[][],
  change: string | string[] | string[][],
  limit?: number
): string | string[] | string[][] {
  if (typeof search === 'string' && typeof change === 'string') {
    return Internal.mapper<string, string>(input, (source) => {
      const entry = String(source ?? '')
      if (limit === undefined || limit < 0) {
        return entry.replaceAll(search, change)
      }
      if (limit === 0) {
        return entry
      }
      if (search.length === 0) {
        let prefix = change
        let cursor = 0
        let count = 0
        while (count < limit - 1 && cursor < entry.length) {
          const width = (entry.codePointAt(cursor) ?? 0) > 0xffff ? 2 : 1
          prefix += entry.slice(cursor, cursor + width) + change
          cursor += width
          count++
        }
        return prefix + entry.slice(cursor)
      }
      let updated = ''
      let cursor = 0
      let replaced = 0
      while (replaced < limit) {
        const match = entry.indexOf(search, cursor)
        if (match === -1) {
          break
        }
        updated += entry.slice(cursor, match) + change
        cursor = match + search.length
        replaced++
      }
      return updated + entry.slice(cursor)
    })
  }
  return Internal.broadcast<string>(
    Internal.broadcast(
      input,
      search,
      (entry, needle) => ({ entry: String(entry ?? ''), needle: String(needle ?? '') }),
      '' as unknown as number
    ),
    change,
    (leading, replacement) => {
      const { entry, needle } = leading as unknown as { entry: string; needle: string }
      return replace(entry, needle, String(replacement ?? ''), limit) as string
    },
    '' as unknown as number
  )
}
