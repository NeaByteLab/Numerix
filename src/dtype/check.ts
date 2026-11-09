/** Complex data types */
const complex = new Set(['complex64', 'complex128'])

/** Floating-point data types */
const floating = new Set(['float16', 'float32', 'float64'])

/** Signed integer data types */
const signed = new Set(['int8', 'int16', 'int32', 'int64'])

/** Unsigned integer data types */
const unsigned = new Set(['uint8', 'uint16', 'uint32', 'uint64'])

/** Integer data types */
const integer = new Set([...signed, ...unsigned])

/** Numeric data types */
const numeric = new Set([...integer, ...floating, ...complex])

/** Data types by category name */
const groups: Record<string, ReadonlySet<string>> = {
  /** Boolean category set */
  bool: new Set(['bool']),
  /** Complex category set */
  complex,
  /** NumPy complex floating-point category set */
  'complex floating': complex,
  /** Floating-point category set */
  floating,
  /** Integer category set */
  integer,
  /** NumPy integral category set */
  integral: integer,
  /** Numeric category set */
  numeric,
  /** NumPy real floating-point category set */
  'real floating': floating,
  /** Signed integer category set */
  signed,
  /** NumPy signed integer category set */
  'signed integer': signed,
  /** String category set */
  string: new Set(['string']),
  /** Unsigned integer category set */
  unsigned,
  /** NumPy unsigned integer category set */
  'unsigned integer': unsigned
}

/**
 * Test a type against a category.
 * @description Matches the type against the category members.
 * @param dtype - Data type name to test
 * @param category - Category against which the type is tested
 * @returns True when the type belongs to the category
 */
export default function check(dtype: string, category: string = 'numeric'): boolean {
  if (dtype !== 'bool' && !numeric.has(dtype) && dtype !== 'string') {
    throw new TypeError(`data type '${dtype}' not understood`)
  }
  if (dtype === category) {
    return true
  }
  if (!(category in groups)) {
    throw new RangeError(`kind '${category}' is not a known kind name`)
  }
  return groups[category]?.has(dtype) ?? false
}
