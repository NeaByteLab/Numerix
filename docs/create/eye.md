# eye

Create an identity matrix with an optional diagonal offset.

## API

```ts
Numeric.create.eye(rows, columns = rows, offset = 0)
```

Builds an identity matrix with a shifted diagonal.

- Parameters:
  - `rows`: Number of rows in the matrix
  - `columns`: Number of columns in the matrix
  - `offset`: Diagonal offset of the ones
- Returns: Identity matrix
- NumPy: Covers `np.eye`, `np.identity` through a single Numerix method.

## Examples

### Square identity matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.eye(3)

console.log(matrix)
// [[1,0,0],[0,1,0],[0,0,1]]
```

### Rectangular identity matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.eye(2, 3)

console.log(matrix)
// [[1,0,0],[0,1,0]]
```

### Identity matrix with a diagonal offset

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.eye(3, 3, 1)

console.log(matrix)
// [[0,1,0],[0,0,1],[0,0,0]]
```

### Single row identity matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.eye(1, 2)

console.log(matrix)
// [[1,0]]
```
