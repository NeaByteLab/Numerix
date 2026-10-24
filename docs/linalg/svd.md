# svd

Compute the singular value decomposition of a matrix.

## API

```ts
Numeric.linalg.svd(matrix, only = false)
```

Derives singular values from the matrix eigenpairs.

- Parameters:
  - `matrix`: Matrix to decompose
  - `only`: When true returns singular values without factors
- Returns: Singular values alone or singular values with factors
- NumPy: Covers `np.linalg.svd`, `np.linalg.svdvals` through a single Numerix method.

## Examples

### Decompose a two by two matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.svd([[1, 2], [3, 4]])

console.log(value)
// {"U":[[0.404553584833757,-0.9145142956773019],[0.9145142956773046,0.4045535848337563]],"S":[5.464985704219043,0.36596619062625874],"Vt":[[0.5760484367663208,0.8174155604703633],[0.8174155604703633,-0.5760484367663208]]}
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
