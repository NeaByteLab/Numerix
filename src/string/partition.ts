/**
 * Split text around a separator.
 * @description Reports the text before and after the separator.
 * @param text - String or array of strings to partition
 * @param separator - Separator marking the split position
 * @param reverse - When true splits at the last separator
 * @returns Partitioned parts matching the input shape
 */
export default function partition(
  text: string | string[],
  separator: string,
  reverse: boolean = false
): [string, string, string] | [string, string, string][] {
  if (!Array.isArray(text)) {
    return partitionText(text, separator, reverse)
  }
  const length = text.length
  const result = new Array<[string, string, string]>(length)
  for (let index = 0; index < length; index++) {
    result[index] = partitionText(text[index] ?? '', separator, reverse)
  }
  return result
}

/**
 * Split one string around a separator.
 * @description Reports the text before and after the separator.
 * @param text - String to partition
 * @param separator - Separator marking the split position
 * @param reverse - When true splits at the last separator
 * @returns Parts before, at, and after the separator
 */
function partitionText(
  text: string,
  separator: string,
  reverse: boolean
): [string, string, string] {
  const position = reverse ? text.lastIndexOf(separator) : text.indexOf(separator)
  if (position === -1) {
    return reverse ? ['', '', text] : [text, '', '']
  }
  return [text.slice(0, position), separator, text.slice(position + separator.length)]
}
