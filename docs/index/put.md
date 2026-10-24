# put

Write values into an array at the given positions.

## API

```ts
Numeric.index.put(input, indices, values, axis = 1)
```

Assigns values into an array at the given positions.

- Parameters:
  - `input`: Array receiving the written values
  - `indices`: Positions or mask selecting the targets
  - `values`: Values written into the array
  - `axis`: Axis along which the values are written
- Returns: Array containing the written values
- NumPy: Covers `np.put`, `np.put_along_axis`, `np.putmask`, `np.place`, `np.fill_diagonal`, `ndarray.put` through a single Numerix method.

## Examples

### Write values at given positions

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.index.put([1, 2, 3], [0, 2], [9, 9])

console.log(values)
// [9,2,9]
```

### Write one value at a position

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.index.put([1, 2, 3], [1], [9])

console.log(values)
// [1,9,3]
```

### Write values through a boolean mask

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.index.put([1, 2, 3], [true, false, true], [9, 9])

console.log(values)
// [9,2,9]
```

### Fill the diagonal of a matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.index.put([[1, 2], [3, 4]], 'diag', [9, 9])

console.log(matrix)
// [[9,2],[3,9]]
```
