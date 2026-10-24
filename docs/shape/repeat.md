# repeat

Repeat each element or tile the whole array several times.

## API

```ts
Numeric.shape.repeat(input, repeats, tile = false)
```

Repeats entries or tiles the whole array.

- Parameters:
  - `input`: Array whose entries are repeated
  - `repeats`: Number of repetitions applied
  - `tile`: When true tiles the whole array instead
- Returns: Array holding the repeated values
- NumPy: Covers `np.repeat`, `np.tile`, `ndarray.repeat` through a single Numerix method.

## Examples

### Repeat each element

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.repeat([1, 2], 2)

console.log(values)
// [1,1,2,2]
```

### Tile the whole array

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.repeat([1, 2], 2, true)

console.log(values)
// [1,2,1,2]
```

### Repeat each element three times

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.repeat([1, 2], 3)

console.log(values)
// [1,1,1,2,2,2]
```

### Tile a matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.repeat([[1, 2]], 2, true)

console.log(matrix)
// [1,2,1,2]
```
