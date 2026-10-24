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
  bit,
  complex,
  create,
  dtype,
  fft,
  index,
  linalg,
  logic,
  math,
  poly,
  random,
  reduce,
  set,
  shape,
  sort,
  stat,
  string,
  trig,
  util,
  window
}

/**
 * Numerix public type definitions.
 * @description Re-exports the shared type aliases and interfaces.
 */
export type * from '@app/types.ts'
