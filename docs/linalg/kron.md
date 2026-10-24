# kron

Compute the Kronecker product of two arrays.

## API

```ts
Numeric.linalg.kron(left, right)
```

Forms the Kronecker product of the two operands.

- Parameters:
  - `left`: First array of values
  - `right`: Second array of values
- Returns: Kronecker product of the two arrays
- NumPy: Equivalent to `np.kron`.

## Examples

### Kronecker product of two vectors

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.kron([1, 2], [3, 4])

console.log(value)
// [3,4,6,8]
```

### Kronecker product with the identity matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.kron([1, 2], [[1, 0], [0, 1]])

console.log(value)
// [[1,0,2,0],[0,1,0,2]]
```

### Kronecker product of a scalar vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.kron([2], [3, 4])

console.log(value)
// [6,8]
```

### Kronecker product with a zero vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.kron([1, 2], [0])

console.log(value)
// [0,0]
```
