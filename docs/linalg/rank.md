# rank

Compute the numerical rank of a matrix.

## API

```ts
Numeric.linalg.rank(matrix, tolerance = 1e-10)
```

Counts the linearly independent rows of the matrix.

- Parameters:
  - `matrix`: Matrix whose rank is computed
  - `tolerance`: Threshold below which a value counts as zero
- Returns: Rank of the given matrix
- NumPy: Equivalent to `np.linalg.matrix_rank`.

## Examples

### Rank of a full rank matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.rank([[1, 2], [3, 4]])

console.log(value)
// 2
```

### Rank of the identity matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.rank([[1, 0], [0, 1]])

console.log(value)
// 2
```

### Rank of a matrix with repeated rows

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.rank([[1, 2], [1, 2]])

console.log(value)
// 1
```

### Rank of a zero matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.rank([[0, 0], [0, 0]])

console.log(value)
// 0
```
