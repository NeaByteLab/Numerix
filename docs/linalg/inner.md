# inner

Compute the inner product of two vectors.

## API

```ts
Numeric.linalg.inner(left, right)
```

Multiplies matching entries and sums the results.

- Parameters:
  - `left`: First vector or array of vectors
  - `right`: Second vector or array of vectors
- Returns: Inner products matching the input shape
- NumPy: Equivalent to `np.inner`.

## Examples

### Inner product of two vectors

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.inner([1, 2], [3, 4])

console.log(value)
// 11
```

### Inner product of an array of vectors

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.inner([[1, 2], [3, 4]], [[1, 0], [0, 1]])

console.log(value)
// [[1,2],[3,4]]
```

### Inner product of orthogonal vectors

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.inner([1, 0], [0, 1])

console.log(value)
// 0
```

### Inner product of a vector with itself

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.inner([3, 4], [3, 4])

console.log(value)
// 25
```
