# matmul

Multiply two matrices together.

## API

```ts
Numeric.linalg.matmul(left, right)
```

Multiplies two matrices and sums the products.

- Parameters:
  - `left`: First matrix of values
  - `right`: Second matrix of values
- Returns: Product of the two matrices
- NumPy: Covers `np.matmul`, `np.linalg.matmul`, `np.linalg.multi_dot` through a single Numerix method.

## Examples

### Multiply two matrices

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.matmul([[1, 2], [3, 4]], [[1, 0], [0, 1]])

console.log(value)
// [[1,2],[3,4]]
```

### Multiply a row by a column

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.matmul([[1, 2]], [[3], [4]])

console.log(value)
// [[11]]
```

### Multiply by the identity matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.matmul([[1, 2], [3, 4]], [[1, 0], [0, 1]])

console.log(value)
// [[1,2],[3,4]]
```

### Multiply by a zero matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.matmul([[1, 2], [3, 4]], [[0, 0], [0, 0]])

console.log(value)
// [[0,0],[0,0]]
```
