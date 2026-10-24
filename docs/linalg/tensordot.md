# tensordot

Contract the requested axes of two operands.

## API

```ts
Numeric.linalg.tensordot(left, right, axes = 1)
```

Contracts the requested axes of both operands.

- Parameters:
  - `left`: First operand of the contraction
  - `right`: Second operand of the contraction
  - `axes`: Number of axes contracted on each operand
- Returns: Contracted scalar or matrix
- NumPy: Covers `np.tensordot`, `np.linalg.tensordot` through a single Numerix method.

## Examples

### Contract one axis of each operand

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.tensordot([[1, 2], [3, 4]], [[1, 0], [0, 1]], 1)

console.log(value)
// [[1,2],[3,4]]
```

### Contract every axis of both operands

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.tensordot([[1, 2], [3, 4]], [[1, 0], [0, 1]], 2)

console.log(value)
// 5
```

### Contract no axes of the operands

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.tensordot([[1, 2], [3, 4]], [[1, 0], [0, 1]], 0)

console.log(value)
// [[1,0,0,1],[2,0,0,2],[3,0,0,3],[4,0,0,4]]
```

### Contract a matrix with the identity matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.tensordot([[1, 2], [3, 4]], [[1, 0], [0, 1]])

console.log(value)
// [[1,2],[3,4]]
```
