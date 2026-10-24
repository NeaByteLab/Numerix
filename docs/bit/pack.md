# pack

Pack bit values into bytes.

## API

```ts
Numeric.bit.pack(bits, order = 'big')
```

Groups bits into bytes using the requested order.

- Parameters:
  - `bits`: Bit values to pack
  - `order`: Byte order used for packing
- Returns: Packed byte values
- NumPy: Equivalent to `np.packbits`.

## Examples

### Pack eight bits into one byte

```ts
import Numeric from '@neabyte/numerix'

const bytes = Numeric.bit.pack([1, 0, 1, 0, 0, 0, 0, 1])

console.log(bytes)
// [161]
```

### Pack bits in little endian order

```ts
import Numeric from '@neabyte/numerix'

const bytes = Numeric.bit.pack([1, 0, 1, 0, 0, 0, 0, 1], 'little')

console.log(bytes)
// [133]
```

### Pack fewer than eight bits

```ts
import Numeric from '@neabyte/numerix'

const bytes = Numeric.bit.pack([1, 0, 1])

console.log(bytes)
// [160]
```

### Pack an empty bit vector

```ts
import Numeric from '@neabyte/numerix'

const bytes = Numeric.bit.pack([])

console.log(bytes)
// []
```
