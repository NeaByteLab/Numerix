# diag

Read entries along a matrix diagonal or build a diagonal matrix.

## API

```ts
Numeric.create.diag(input, offset = 0, flat = false)
```

Reads or writes entries along the diagonal.

- Parameters:
  - `input`: Vector or matrix to read from
  - `offset`: Diagonal offset used for the extraction
  - `flat`: When true treats the input as a flat vector
- Returns: Diagonal entries or matrix holding them
- NumPy: Covers `np.diag`, `np.diagflat` through a single Numerix method.

## Examples

### Build a diagonal matrix from a vector

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.diag([1, 2, 3])

console.log(matrix)
// [[1,0,0],[0,2,0],[0,0,3]]
```

### Read the diagonal of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.diag([[1, 2], [3, 4]])

console.log(values)
// [1,4]
```

### Build a diagonal matrix above the main diagonal

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.diag([1, 2, 3], 1)

console.log(matrix)
// [[0,1,0,0],[0,0,2,0],[0,0,0,3],[0,0,0,0]]
```

### Build a diagonal matrix below the main diagonal

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.diag([1, 2, 3], -1)

console.log(matrix)
// [[0,0,0,0],[1,0,0,0],[0,2,0,0],[0,0,3,0]]
```
