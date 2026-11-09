# take

Pick values from an array at the given indices.

## API

```ts
Numeric.index.take(input, indices = 0, offset, policy = 'wrap')
```

Reads the entries at the selected positions.

- Parameters:
  - `input`: Array holding the requested values
  - `indices`: Positions or pattern selecting the entries
  - `offset`: Shift or boundary handling applied to each position
  - `policy`: Boundary handling mode
- Returns: Values taken from the input
- NumPy: Covers `np.take`, `np.take_along_axis`, `np.diagonal`, `np.linalg.diagonal`, `ndarray.take`, `ndarray.diagonal`, `ndarray.item` through a single Numerix method.

## Examples

### Take values at given positions

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.index.take([10, 20, 30], [0, 2])

console.log(values)
// [10,30]
```

### Take a single value by position

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.index.take([10, 20, 30], 1)

console.log(value)
// 20
```

### Take the first value by default

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.index.take([10, 20, 30])

console.log(value)
// 10
```

### Take the last value with a negative position

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.index.take([10, 20, 30], -1)

console.log(value)
// 30
```
