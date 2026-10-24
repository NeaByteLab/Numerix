# broadcast

Expand an array to a larger shape following NumPy broadcasting rules.

## API

```ts
Numeric.shape.broadcast(input, shape, mode = 'to')
```

Stretches the array across the requested shape.

- Parameters:
  - `input`: Nested array to broadcast
  - `shape`: Target dimensions of the broadcast array
  - `mode`: Broadcasting mode applied to the array
- Returns: Array broadcast to the requested shape
- NumPy: Covers `np.broadcast_to`, `np.broadcast_arrays`, `np.broadcast_shapes` through a single Numerix method.

## Examples

### Broadcast a column vector

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.broadcast([[1], [2]], [2, 2])

console.log(matrix)
// [[1,1],[2,2]]
```

### Broadcast a row vector

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.broadcast([[1, 2]], [2, 2])

console.log(matrix)
// [[1,2],[1,2]]
```

### Broadcast a scalar into a matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.broadcast([7], [2, 3])

console.log(matrix)
// [[7,7,7],[7,7,7]]
```

### Broadcast into a longer vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.broadcast([1, 2], [4])

console.log(values)
// [1,2]
```
