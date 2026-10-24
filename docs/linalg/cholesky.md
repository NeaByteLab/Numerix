# cholesky

Compute the Cholesky decomposition of a matrix.

## API

```ts
Numeric.linalg.cholesky(matrix, upper = false)
```

Computes the Cholesky factor of a positive definite matrix.

- Parameters:
  - `matrix`: Positive definite matrix to decompose
  - `upper`: When true returns the upper triangular factor
- Returns: Cholesky factor of the given matrix
- NumPy: Equivalent to `np.linalg.cholesky`.

## Examples

### Cholesky factor of a two by two matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.cholesky([[4, 2], [2, 3]])

console.log(value)
// [[2,0],[1,1.4142135623730951]]
```

### Upper triangular Cholesky factor

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.cholesky([[4, 2], [2, 3]], true)

console.log(value)
// [[2,1],[0,1.4142135623730951]]
```

### Cholesky factor of the identity matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.cholesky([[1, 0], [0, 1]])

console.log(value)
// [[1,0],[0,1]]
```

### Cholesky factor of a diagonal matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.cholesky([[9, 0], [0, 16]])

console.log(value)
// [[3,0],[0,4]]
```
