# encode

Convert strings into UTF-8 byte buffers.

## API

```ts
Numeric.string.encode(text)
```

Converts strings into UTF-8 byte buffers.

- Parameters:
  - `text`: String or array of strings to encode
- Returns: Byte buffers matching the input shape
- NumPy: Covers `np.strings.encode`, `np.char.encode` through a single Numerix method.

## Examples

### Encode a single string

```ts
import Numeric from '@neabyte/numerix'

const bytes = Numeric.string.encode('hi')

console.log(Array.from(bytes))
// [104,105]
```

### Encode an array of strings

```ts
import Numeric from '@neabyte/numerix'

const buffers = Numeric.string.encode(['a', 'b'])

console.log(buffers.map((buffer) => Array.from(buffer)))
// [[97],[98]]
```

### Encode an empty string

```ts
import Numeric from '@neabyte/numerix'

const bytes = Numeric.string.encode('')

console.log(Array.from(bytes))
// []
```

### Encode a non ascii character

```ts
import Numeric from '@neabyte/numerix'

const bytes = Numeric.string.encode('é')

console.log(Array.from(bytes))
// [195,169]
```
