# resize

Resize an array into a new dimension layout, trimming or padding values.

## API

```ts
Numeric.shape.resize(input, shape)
```

Rebuilds the array with the requested dimensions.

- Parameters:
  - `input`: Nested array to resize
  - `shape`: Target dimensions of the resized array
- Returns: Array holding the resized values
- NumPy: Covers `np.resize`, `ndarray.resize` through a single Numerix method.

## Examples

### Resize a matrix into a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.resize([[1, 2], [3, 4]], [3])

console.log(values)
// [1,2,3]
```

### Resize a vector into a matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.resize([1, 2, 3, 4], [2, 2])

console.log(matrix)
// [[1,2],[3,4]]
```

### Resize beyond the available values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.resize([1, 2], [4])

console.log(values)
// [1,2,1,2]
```

### Resize into a single row

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.resize([1, 2, 3], [1, 3])

console.log(matrix)
// [[1,2,3]]
```
