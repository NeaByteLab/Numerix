# eig

Compute the eigenvalues and eigenvectors of a matrix.

## API

```ts
Numeric.linalg.eig(matrix, compact = false)
```

Uses Jacobi iteration for symmetric matrices, otherwise QR.

- Parameters:
  - `matrix`: Square matrix to decompose
  - `compact`: When true returns eigenvalues without eigenvectors
- Returns: Eigenvalues alone or eigenvalues with eigenvectors
- NumPy: Covers `np.linalg.eig`, `np.linalg.eigh`, `np.linalg.eigvals`, `np.linalg.eigvalsh` through a single Numerix method.

## Examples

### Decompose a two by two matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.eig([[1, 2], [3, 4]])

console.log(value)
// {"values":[-0.37228132326901164,5.372281323269014],"vectors":[[0.8245648401323938,-0.5657674649689922],[0.4159735579192842,0.909376709132124]]}
```

### Eigenvalues of the identity matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.eig([[1, 0], [0, 1]], true)

console.log(value)
// [1,1]
```

### Eigenvalues of a diagonal matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.eig([[3, 0], [0, 2]], true)

console.log(value)
// [2,3]
```

### Eigenvalues of a symmetric matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.eig([[2, 1], [1, 2]], true)

console.log(value)
// [0.9999999999999998,2.9999999999999996]
```
