# svd

Compute the singular value decomposition of a matrix.

## API

```ts
Numeric.linalg.svd(matrix, compact, complete)
```

Derives singular values from the matrix eigenpairs.

- Parameters:
  - `matrix`: Complex matrix to decompose
  - `compact`: When true returns singular values without factors
  - `complete`: When true returns full left and right factor matrices
- Returns: Singular values alone or singular values with factors
- NumPy: Covers `np.linalg.svd`, `np.linalg.svdvals` through a single Numerix method.

## Examples

### Decompose a two by two matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.svd([[1, 2], [3, 4]])

console.log(value)
// {"U":[[0.4045535848337569,-0.9145142956773042],[0.9145142956773044,0.40455358483375736]],"S":[5.4649857042190435,0.3659661906262578],"Vt":[[0.5760484367663208,0.8174155604703633],[0.8174155604703633,-0.5760484367663208]]}
```

### Singular values of the identity matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.svd([[1, 0], [0, 1]], true)

console.log(value)
// [1,1]
```

### Singular values of a diagonal matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.svd([[3, 0], [0, 2]], true)

console.log(value)
// [3,2]
```

### Singular values of a rank one matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.svd([[1, 2], [2, 4]], true)

console.log(value)
// [5,0]
```
