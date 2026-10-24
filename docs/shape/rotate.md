# rotate

Rotate a matrix by a quarter turn.

## API

```ts
Numeric.shape.rotate(matrix, turns = 1)
```

Rotates the matrix by the requested quarter turns.

- Parameters:
  - `matrix`: Matrix to rotate
  - `turns`: Number of quarter turns applied
- Returns: Rotated matrix
- NumPy: Equivalent to `np.rot90`.

## Examples

### Rotate a matrix once

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.rotate([[1, 2], [3, 4]])

console.log(matrix)
// [[2,4],[1,3]]
```

### Rotate a matrix twice

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.rotate([[1, 2], [3, 4]], 2)

console.log(matrix)
// [[4,3],[2,1]]
```

### Rotate a matrix four times

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.rotate([[1, 2], [3, 4]], 4)

console.log(matrix)
// [[1,2],[3,4]]
```

### Rotate a rectangular matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.rotate([[1, 2, 3], [4, 5, 6]])

console.log(matrix)
// [[3,6],[2,5],[1,4]]
```
