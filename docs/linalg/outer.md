# outer

Compute the outer product of two vectors.

## API

```ts
Numeric.linalg.outer(left, right)
```

Multiplies every entry of the left vector by the right vector.

- Parameters:
  - `left`: First vector of values
  - `right`: Second vector of values
- Returns: Outer product matrix
- NumPy: Covers `np.outer`, `np.linalg.outer` through a single Numerix method.

## Examples

### Outer product of two vectors

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.outer([1, 2], [3, 4])

console.log(value)
// [[3,4],[6,8]]
```

### Outer product with a scalar vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.outer([1, 2], [3])

console.log(value)
// [[3],[6]]
```

### Outer product of a unit vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.outer([1, 0], [1, 2])

console.log(value)
// [[1,2],[0,0]]
```

### Outer product of equal vectors

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.outer([2, 3], [2, 3])

console.log(value)
// [[4,6],[6,9]]
```
