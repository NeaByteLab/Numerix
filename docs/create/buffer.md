# buffer

Build an array from binary, textual, iterable, or generated data.

## API

```ts
Numeric.create.buffer(source, shape, delimiter = ' ')
```

Reads binary, textual, or generated values.

- Parameters:
  - `source`: Binary buffer, text, or value generator
  - `shape`: Target shape of the created array
  - `delimiter`: Separator used when reading text
- Returns: Array holding the decoded values
- NumPy: Covers `np.frombuffer`, `np.fromstring`, `np.fromiter`, `np.fromfunction`, `np.from_dlpack` through a single Numerix method.

## Examples

### Read values from spaced text

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.buffer('1 2 3', [3])

console.log(values)
// [1,2,3]
```

### Read values using a custom delimiter

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.buffer('1,2,3', undefined, ',')

console.log(values)
// [1,2,3]
```

### Read values from a binary view

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.buffer(new Uint8Array([1, 2, 3]), [3])

console.log(values)
// [1,2,3]
```

### Generate values from a callback

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.buffer(
  (row: number, column: number) => row * 10 + column,
  [2, 3]
)

console.log(values)
// [[0,1,2],[10,11,12]]
```
