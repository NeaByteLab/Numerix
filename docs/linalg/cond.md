# cond

Compute the condition number of a matrix.

## API

```ts
Numeric.linalg.cond(matrix)
```

Ratios the largest and smallest singular values.

- Parameters:
  - `matrix`: Matrix whose condition number is computed
- Returns: Condition number of the given matrix
- NumPy: Equivalent to `np.linalg.cond`.

## Examples

### Condition number of a two by two matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.cond([[1, 2], [3, 4]])

console.log(value)
// 14.933034373659215
```

### Condition number of the identity matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.cond([[1, 0], [0, 1]])

console.log(value)
// 1
```

### Condition number of a diagonal matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.cond([[3, 0], [0, 2]])

console.log(value)
// 1.5
```

### Condition number of a singular matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.cond([[1, 2], [2, 4]])

console.log(value)
// Infinity
```
