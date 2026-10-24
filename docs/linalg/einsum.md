# einsum

Contract array axes following a subscript formula.

## API

```ts
Numeric.linalg.einsum(subscripts, left, right)
```

Contracts array axes following a subscript formula.

- Parameters:
  - `subscripts`: Index formula describing the contraction
  - `left`: First operand of the contraction
  - `right`: Second operand of the contraction
- Returns: Contracted values matching the requested output axes
- NumPy: Covers `np.einsum`, `np.einsum_path` through a single Numerix method.

## Examples

### Sum the columns of a matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.einsum('ij->i', [[1, 2], [3, 4]])

console.log(value)
// [3,7]
```

### Trace of a matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.einsum('ii->', [[1, 2], [3, 4]])

console.log(value)
// 5
```

### Contract a matrix with a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.einsum('ij,j->i', [[1, 2], [3, 4]], [1, 1])

console.log(value)
// [[1,2],[3,4]]
```

### Multiply two matrices

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.einsum('ij,jk->ik', [[1, 2], [3, 4]], [[1, 0], [0, 1]])

console.log(value)
// [[1,2],[3,4]]
```
