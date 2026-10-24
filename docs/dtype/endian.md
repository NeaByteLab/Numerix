# endian

Inspect or swap the byte order of a buffer.

## API

```ts
Numeric.dtype.endian(bytes, swap = false)
```

Reports endianness or reverses byte sequences.

- Parameters:
  - `bytes`: Buffer or bytes whose order is inspected
  - `swap`: When true reverses the byte sequence
- Returns: Endianness descriptor or the swapped bytes
- NumPy: Covers `np.lib.array_utils.byte_bounds`, `ndarray.byteswap` through a single Numerix method.

## Examples

### Inspect a typed array buffer

```ts
import Numeric from '@neabyte/numerix'

const descriptor = Numeric.dtype.endian(new Uint8Array([1, 2, 3, 4]))

console.log(descriptor)
// {"order":"LE","byteLength":4,"byteOffset":0}
```

### Inspect a byte vector

```ts
import Numeric from '@neabyte/numerix'

const descriptor = Numeric.dtype.endian([1, 2])

console.log(descriptor)
// {"order":"LE","byteLength":16,"byteOffset":0}
```

### Reverse the byte order

```ts
import Numeric from '@neabyte/numerix'

const swapped = Numeric.dtype.endian([1, 2, 3, 4], true)

console.log(swapped)
// [16777216,33554432,50331648,67108864]
```

### Inspect without any bytes

```ts
import Numeric from '@neabyte/numerix'

const descriptor = Numeric.dtype.endian()

console.log(descriptor)
// {"order":"LE","byteLength":0,"byteOffset":0}
```
