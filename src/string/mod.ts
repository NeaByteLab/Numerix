/** Template placeholder pattern */
const placeholder = /%[sd]/g

/**
 * Format a template with values.
 * @description Substitutes placeholders in the template string.
 * @param template - Template string or array of templates
 * @param values - Replacement values for the template placeholders
 * @returns Formatted strings matching the input shape
 */
export default function mod(
  template: string | string[],
  values: (string | number) | (string | number)[]
): string | string[] {
  if (Array.isArray(template)) {
    const length = template.length
    const result = new Array<string>(length)
    const arrayed = Array.isArray(values)
    for (let index = 0; index < length; index++) {
      const value = arrayed ? (values[index] ?? '') : values
      result[index] = (template[index] ?? '').replace(placeholder, String(value))
    }
    return result
  }
  return template.replace(placeholder, String(values))
}
