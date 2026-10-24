# decode

Convert UTF-8 byte buffers into strings.

## API

```ts
Numeric.string.decode(bytes)
```

Converts byte buffers using UTF-8 encoding.

- Parameters:
  - `bytes`: Byte buffer or array of buffers to decode
- Returns: Decoded strings matching the input shape
- NumPy: Covers `np.strings.decode`, `np.char.decode` through a single Numerix method.

## Examples

### Decode a single buffer

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.decode(new TextEncoder().encode('hello'))

console.log(value)
// hello
```

### Decode an array of buffers

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.string.decode([
  new TextEncoder().encode('a'),
  new TextEncoder().encode('b')
])

console.log(values)
// ["a","b"]
```

### Decode an empty buffer

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.decode(new Uint8Array())

console.log(value)
//
```

### Decode a non ascii buffer

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.decode(new Uint8Array([195, 169]))

console.log(value)
// é
```
