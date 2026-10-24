# reshape

Reshape nested values into a new dimension layout.

## API

```ts
Numeric.shape.reshape(input, shape)
```

Rebuilds the array with the requested dimensions.

- Parameters:
  - `input`: Nested array to reshape
  - `shape`: Target dimensions of the reshaped array
- Returns: Array holding the reshaped values
- NumPy: Covers `np.reshape`, `ndarray.reshape` through a single Numerix method.

## Examples

### Flatten a matrix into a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.reshape([[1, 2], [3, 4]], [4])

console.log(values)
// [1,2,3,4]
```

### Build a matrix from a vector

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.reshape([1, 2, 3, 4], [2, 2])

console.log(matrix)
// [[1,2],[3,4]]
```

### Build a three dimensional array

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.reshape([1, 2, 3, 4], [2, 1, 2])

console.log(values)
// [[[1,2]],[[3,4]]]
```

### Reshape into a single row

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.reshape([1, 2, 3], [1, 3])

console.log(matrix)
// [[1,2,3]]
```
