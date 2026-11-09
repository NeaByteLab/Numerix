import * as bit from '@app/bit/index.ts'
import * as complex from '@app/complex/index.ts'
import * as create from '@app/create/index.ts'
import * as dtype from '@app/dtype/index.ts'
import * as fft from '@app/fft/index.ts'
import * as index from '@app/index/index.ts'
import * as linalg from '@app/linalg/index.ts'
import * as logic from '@app/logic/index.ts'
import * as math from '@app/math/index.ts'
import * as poly from '@app/poly/index.ts'
import * as random from '@app/random/index.ts'
import * as reduce from '@app/reduce/index.ts'
import * as set from '@app/set/index.ts'
import * as shape from '@app/shape/index.ts'
import * as sort from '@app/sort/index.ts'
import * as stat from '@app/stat/index.ts'
import * as string from '@app/string/index.ts'
import * as trig from '@app/trig/index.ts'
import * as util from '@app/util/index.ts'
import * as window from '@app/window/index.ts'

/**
 * Numerix public API.
 * @description Groups every public namespace under a single root export.
 */
export default {
  /** Bitwise operations namespace */
  bit,
  /** Complex number operations namespace */
  complex,
  /** Array creation namespace */
  create,
  /** Data type inspection namespace */
  dtype,
  /** Fast Fourier transform namespace */
  fft,
  /** Array indexing namespace */
  index,
  /** Linear algebra namespace */
  linalg,
  /** Logical comparison namespace */
  logic,
  /** Arithmetic and math namespace */
  math,
  /** Polynomial evaluation namespace */
  poly,
  /** Random sampling namespace */
  random,
  /** Reduction operations namespace */
  reduce,
  /** Set operations namespace */
  set,
  /** Array shape manipulation namespace */
  shape,
  /** Sorting and searching namespace */
  sort,
  /** Statistical operations namespace */
  stat,
  /** String manipulation namespace */
  string,
  /** Trigonometric operations namespace */
  trig,
  /** Utility operations namespace */
  util,
  /** Window generation namespace */
  window
}

/**
 * Numerix public type definitions.
 * @description Re-exports the shared type aliases and interfaces.
 */
export type * from '@app/types.ts'
