# tri

Create a triangular matrix filled above or below the diagonal.

## API

```ts
Numeric.create.tri(input, columns, diagonal = 0, mode = 'mask')
```

Builds a matrix filled above or below the diagonal.

- Parameters:
  - `input`: Number of rows or an existing matrix
  - `columns`: Number of columns in the matrix
  - `diagonal`: Diagonal offset of the triangle
  - `mode`: Triangle side that is filled
- Returns: Triangular matrix
- NumPy: Covers `np.tri`, `np.tril`, `np.triu` through a single Numerix method.

## Examples

### Triangular matrix with ones below the diagonal

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.tri(3, 3)

console.log(matrix)
// [[1,0,0],[1,1,0],[1,1,1]]
```

### Lower triangular matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.tri(3, 3, 0, 'lower')

console.log(matrix)
// [[1,0,0],[1,1,0],[1,1,1]]
```

### Upper triangular matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.tri(3, 3, 0, 'upper')

console.log(matrix)
// [[1,1,1],[0,1,1],[0,0,1]]
```

### Triangular matrix with a diagonal offset

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.tri(3, 3, 1)

console.log(matrix)
// [[1,1,0],[1,1,1],[1,1,1]]
```
