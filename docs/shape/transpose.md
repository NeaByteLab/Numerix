# transpose

Reorder the axes of a nested array.

## API

```ts
Numeric.shape.transpose(input, axes, second)
```

Reorders the axes of a nested array.

- Parameters:
  - `input`: Nested array to transpose
  - `axes`: Axis order or swapped axis pair
  - `second`: Second axis when swapping a pair
- Returns: Transposed array
- NumPy: Covers `np.transpose`, `np.permute_dims`, `np.matrix_transpose`, `np.swapaxes`, `np.moveaxis`, `np.rollaxis`, `np.linalg.matrix_transpose`, `ndarray.T`, `ndarray.transpose`, `ndarray.swapaxes` through a single Numerix method.

## Examples

### Transpose a matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.transpose([[1, 2], [3, 4]])

console.log(matrix)
// [[1,3],[2,4]]
```

### Transpose with an explicit axis order

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.transpose([[1, 2, 3], [4, 5, 6]], [1, 0])

console.log(matrix)
// [[1,4],[2,5],[3,6]]
```

### Swap a pair of axes

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.transpose([[1, 2, 3], [4, 5, 6]], 0, 1)

console.log(matrix)
// [[1,4],[2,5],[3,6]]
```

### Transpose a single row matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.transpose([[1, 2, 3]])

console.log(matrix)
// [[1],[2],[3]]
```
