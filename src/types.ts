/**
 * Observed bounds of a value set.
 * @description Records the lowest and highest entries with their count.
 */
export interface NumerixBounds {
  /** Number of observed values */
  count: number
  /** Largest observed value */
  high: number
  /** Smallest observed value */
  low: number
}

/**
 * Complex number in Cartesian form.
 * @description Represents a single complex value in Cartesian form.
 */
export interface NumerixComplex {
  /** Imaginary component of the complex number */
  im: number
  /** Real component of the complex number */
  re: number
}

/**
 * Components of a complex entry.
 * @description Reports the parts of an entry and its kind.
 */
export interface NumerixComponents {
  /** Whether the entry carried both components */
  complex: boolean
  /** Imaginary component of the entry */
  im: number
  /** Real component of the entry */
  re: number
}

/**
 * Log-determinant with its sign.
 * @description Holds the log-determinant magnitude and sign.
 */
export interface NumerixDet {
  /** Natural logarithm of the determinant magnitude */
  logDet: number
  /** Sign of the original determinant */
  sign: number | NumerixComplex
}

/**
 * Decimal digits and point offset.
 * @description Holds significant digits beside the decimal point position.
 */
export interface NumerixDigits {
  /** Significant digits of the value */
  digits: string
  /** Decimal point position within the digits */
  point: number
}

/**
 * Data type descriptor with layout details.
 * @description Describes a data type specification together with its layout.
 */
export interface NumerixDtype extends NumerixSpec {
  /** Name of the data type */
  dtype: string
  /** Total size in bytes */
  nbytes: number
  /** Number of dimensions */
  ndim: number
  /** Length of each dimension */
  shape: number[]
  /** Total number of elements */
  size: number
}

/**
 * Eigendecomposition result and vectors.
 * @description Holds eigenvalues and their matching eigenvectors.
 */
export interface NumerixEigen {
  /** Eigenvalues of the input matrix */
  values: number[]
  /** Eigenvectors aligned with the eigenvalues */
  vectors: number[][]
}

/**
 * Endianness descriptor for binary data.
 * @description Describes byte order and alignment of stored values.
 */
export interface NumerixEndian {
  /** Total byte length of the buffer */
  byteLength: number
  /** Byte offset of the first element */
  byteOffset: number
  /** Byte order used for multi-byte values */
  order: 'LE' | 'BE'
}

/**
 * Tracking state for an extreme search.
 * @description Carries the running position and best value across recursion.
 */
export interface NumerixExtreme {
  /** Best entry value found so far */
  best: number
  /** Best entry index found so far */
  bestIndex: number
  /** Whether a NaN entry was encountered */
  hitNan: boolean
  /** Current entry position in the search */
  position: number
}

/**
 * Random generator with spawning support.
 * @description Produces deterministic uniform samples and child generators.
 */
export interface NumerixGenerator {
  /** Produces the next uniform sample */
  next: () => number
  /** Creates an independent child generator */
  spawn: () => NumerixGenerator
}

/**
 * Two-dimensional histogram grid.
 * @description Holds bin counts together with computed edges.
 */
export interface NumerixGrid {
  /** Bin counts per grid cell */
  counts: number[][]
  /** Edge positions along the first axis */
  xEdges: number[]
  /** Edge positions along the second axis */
  yEdges: number[]
}

/**
 * Histogram counts with bin edges.
 * @description Holds computed bin counts and their boundaries.
 */
export interface NumerixHistogram {
  /** Number of observations in each bin */
  counts: number[]
  /** Boundary positions between adjacent bins */
  edges: number[]
}

/**
 * Memory layout descriptor for an array.
 * @description Describes strides, ordering, and access flags.
 */
export interface NumerixLayout {
  /** True when the buffer satisfies alignment */
  aligned: boolean
  /** True when rows are contiguous */
  cContiguous: boolean
  /** True when columns are contiguous */
  fContiguous: boolean
  /** Stride length in bytes per dimension */
  strides: number[]
  /** True when the buffer accepts writes */
  writable: boolean
}

/**
 * Read cursor into a flat source.
 * @description Tracks the next offset consumed while rebuilding nested arrays.
 */
export interface NumerixOffset {
  /** Next offset to read */
  offset: number
}

/**
 * Write cursor into a flat target.
 * @description Tracks the next position receiving a flattened entry.
 */
export interface NumerixPosition {
  /** Next position to write */
  position: number
}

/**
 * QR decomposition result with factors.
 * @description Holds the orthogonal and upper-triangular factors.
 */
export interface NumerixQr {
  /** Orthogonal factor of the decomposition */
  Q: number[][]
  /** Upper-triangular factor of the decomposition */
  R: number[][]
}

/**
 * Running combination applied while reducing entries.
 * @description Carries the merge operation and the starting value.
 */
export interface NumerixReduce {
  /** Operation merging running and next values */
  combine: (running: number, value: number) => number
  /** Starting value of the reduction */
  identity: number
  /** Value substituted for a skipped entry */
  neutral: number
}

/**
 * Rounded digit run and carry flag.
 * @description Holds the kept digits beside a pending carry.
 */
export interface NumerixRound {
  /** Whether the cut carries into preceding digits */
  carry: boolean
  /** Digits kept before the cut */
  kept: string
}

/**
 * Inclusive row span of a diagonal.
 * @description Holds the first and last diagonal row.
 */
export interface NumerixSpan {
  /** Last row holding a diagonal entry */
  end: number
  /** First row holding a diagonal entry */
  start: number
}

/**
 * Numeric range for a data type.
 * @description Holds bit width and representable value bounds.
 */
export interface NumerixSpec {
  /** Bit width of the type */
  bits: number
  /** Machine epsilon for the type */
  eps: number
  /** Size of one element in bytes */
  itemSize: number
  /** Largest representable value */
  max: number
  /** Smallest representable value */
  min: number
  /** Smallest positive normal floating-point value */
  tiny?: number
}

/**
 * Running sum and entry count.
 * @description Accumulates a total with its contributing entry count.
 */
export interface NumerixSum {
  /** Count of entries in total */
  count: number
  /** Running imaginary total of accumulated entries */
  imags: number
  /** Running total of the accumulated entries */
  sum: number
}

/**
 * Singular value decomposition result.
 * @description Holds the singular values and their factor matrices.
 */
export interface NumerixSvd {
  /** Singular values in descending order */
  S: number[]
  /** Left singular vectors */
  U: number[][]
  /** Transposed right singular vectors */
  Vt: number[][]
}

/**
 * Unique value extraction result.
 * @description Holds distinct values and their occurrence details.
 */
export interface NumerixUnique {
  /** Occurrence count for each distinct value */
  counts: number[]
  /** First index of each distinct value */
  indices: number[]
  /** Indices reconstructing the original input */
  inverse: number[]
  /** Distinct values in ascending order */
  values: number[] | number[][]
}

/**
 * Array of real or complex entries.
 * @description Represents a one-dimensional vector or two-dimensional matrix of real or complex entries.
 */
export type NumerixArray =
  | number[]
  | number[][]
  | NumerixComplex[]
  | NumerixComplex[][]
  | (number | NumerixComplex)[]
  | (number | NumerixComplex)[][]

/**
 * Axis selection for a transform.
 * @description Chooses the axes along which a transform runs.
 */
export type NumerixAxis = number | number[] | 'all' | 'rows' | 'columns'

/** Orthogonal polynomial basis families */
export type NumerixBasis = 'poly' | 'cheb' | 'leg' | 'herm' | 'herme' | 'lag'

/** Comparison operators available for element-wise comparisons */
export type NumerixCompare = 'equal' | 'not' | 'less' | 'less_equal' | 'greater' | 'greater_equal'

/**
 * Direction of an extreme search.
 * @description Selects whether the smallest or largest entry wins.
 */
export type NumerixDirection = 'min' | 'max'

/** Gauss quadrature integration weight families */
export type NumerixGauss = 'chebyshev' | 'legendre' | 'hermite' | 'hermite_e' | 'laguerre'

/**
 * Two-dimensional matrix of real or complex entries.
 * @description Represents a two-dimensional matrix of real or complex entries.
 */
export type NumerixMatrix =
  | number[][]
  | NumerixComplex[][]
  | (number | NumerixComplex)[][]

/** Multi-byte packing byte order */
export type NumerixOrder = 'big' | 'little'

/** Selection modes available for boolean indexing */
export type NumerixSelect = 'select' | 'compress' | 'extract' | 'choose'

/**
 * Side of an ordered comparison.
 * @description Chooses between the greater and the lesser side.
 */
export type NumerixSide = 'greater' | 'less'

/** Separator modes available for string splitting */
export type NumerixSplit = 'sep' | 'lines'

/**
 * Direction along which a transform runs.
 * @description Names the axes a grid transform covers.
 */
export type NumerixTransform = 'all' | 'rows' | 'columns'

/**
 * Truthiness mode of a reduction.
 * @description Chooses between requiring every entry and requiring one entry.
 */
export type NumerixTruthy = 'all' | 'any'

/**
 * Value accepted by the complex traversal.
 * @description Represents a real number or complex entry, possibly nested.
 */
export type NumerixValue =
  | NumerixComplex
  | number
  | (NumerixComplex | number)[]
  | (NumerixComplex | number)[][]

/**
 * One-dimensional vector of real or complex entries.
 * @description Represents a one-dimensional vector of real or complex entries.
 */
export type NumerixVector =
  | number[]
  | NumerixComplex[]
  | (number | NumerixComplex)[]

/** Coordinate systems available for condition selection */
export type NumerixWhere = 'index' | 'coord' | 'flat'
