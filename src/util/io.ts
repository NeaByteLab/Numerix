/**
 * Read or write matrix text.
 * @description Parses delimited text or renders a matrix.
 * @param source - Text to parse or matrix to render
 * @param delimiter - Separator placed between columns
 * @returns Parsed matrix or rendered text
 */
export default function io(
  source: string | number[][],
  delimiter = ','
): number[][] | string {
  if (typeof source === 'string') {
    const lines = source.trim().split(/\r?\n/)
    const result: number[][] = []
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index]
      if (!line) {
        continue
      }
      const cells = line.split(delimiter)
      const count = cells.length
      const row = new Array<number>(count)
      for (let cell = 0; cell < count; cell++) {
        row[cell] = Number((cells[cell] ?? '').trim())
      }
      result.push(row)
    }
    return result
  }
  const length = source.length
  const rows = new Array<string>(length)
  for (let index = 0; index < length; index++) {
    rows[index] = (source[index] ?? []).join(delimiter)
  }
  return rows.join('\n')
}
