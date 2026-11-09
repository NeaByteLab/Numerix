# dot

Multiply matching entries and sum the results.

## API

```ts
Numeric.linalg.dot(first, right, conjugate)
```

Multiplies matching entries and sums the results.

- Parameters:
  - `first`: First vector or array of vectors
  - `right`: Second vector or array of vectors
  - `conjugate`: When true conjugates and flattens the operands
- Returns: Dot products matching the input shape
- NumPy: Covers `np.dot`, `np.vdot`, `np.vecdot`, `np.linalg.vecdot`, `ndarray.dot` through a single Numerix method.

## Examples

### Dot product of two vectors

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.dot([1, 2], [3, 4])

console.log(value)
// 11
```

### Dot product of two matrices

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.dot([[1, 2], [3, 4]], [[1, 0], [0, 1]])

console.log(value)
// [[1,2],[3,4]]
```

### Dot product of a matrix and a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.dot([[1, 2], [3, 4]], [1, 1])

console.log(value)
// [3,7]
```

### Dot product of orthogonal vectors

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.dot([1, 0], [0, 1])

console.log(value)
// 0
```
