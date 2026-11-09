# unpack

Unpack byte values into individual bits.

## API

```ts
Numeric.bit.unpack(bytes, order, count, level)
```

Expands each byte into its individual bits.

- Parameters:
  - `bytes`: Byte values to unpack
  - `order`: Byte order used for unpacking
  - `count`: Optional maximum number of unpacked bits
  - `level`: Optional axis along which to unpack two-dimensional matrices
- Returns: Bit values for every byte
- NumPy: Equivalent to `np.unpackbits`.

## Examples

### Unpack one byte

```ts
import Numeric from '@neabyte/numerix'

const bits = Numeric.bit.unpack([160])

console.log(bits)
// [1,0,1,0,0,0,0,0]
```

### Unpack one byte in little endian order

```ts
import Numeric from '@neabyte/numerix'

const bits = Numeric.bit.unpack([160], 'little')

console.log(bits)
// [0,0,0,0,0,1,0,1]
```

### Unpack several bytes

```ts
import Numeric from '@neabyte/numerix'

const bits = Numeric.bit.unpack([1, 2])

console.log(bits)
// [0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0]
```

### Unpack an empty byte vector

```ts
import Numeric from '@neabyte/numerix'

const bits = Numeric.bit.unpack([])

console.log(bits)
// []
```
