# trim

Remove zero entries from the ends of an array.

## API

```ts
Numeric.shape.trim(input, mode = 'fb')
```

Trims leading or trailing zero values.

- Parameters:
  - `input`: Array to trim
  - `mode`: Side or sides that are trimmed
- Returns: Trimmed array without the zero entries
- NumPy: Equivalent to `np.trim_zeros`.

## Examples

### Trim zeros from both ends

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.trim([0, 0, 1, 5, 0])

console.log(values)
// [1,5]
```

### Trim only the leading zeros

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.trim([0, 0, 1, 5, 0], 'f')

console.log(values)
// [1,5,0]
```

### Trim only the trailing zeros

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.trim([0, 0, 1, 5, 0], 'b')

console.log(values)
// [0,0,1,5]
```

### Trim an array without zero ends

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.trim([1, 2, 3])

console.log(values)
// [1,2,3]
```
