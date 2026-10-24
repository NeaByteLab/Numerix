/** Shared buffer backing the bit level views */
const buffer = new ArrayBuffer(8)

/**
 * Bit level views over one buffer.
 * @description Exposes the float and integer views.
 */
export default {
  /** Float view over the shared buffer */
  float: new Float64Array(buffer),
  /** Unsigned integer view over the shared buffer */
  uint: new BigUint64Array(buffer)
}
