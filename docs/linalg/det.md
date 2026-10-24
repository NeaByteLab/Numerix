# det

Compute the determinant of a square matrix.

## API

```ts
Numeric.linalg.det(matrix, logged = false)
```

Uses elimination and tracks the determinant sign.

- Parameters:
  - `matrix`: Square matrix whose determinant is computed
  - `logged`: When true returns the log determinant with sign
- Returns: Determinant value or log determinant with sign
- NumPy: Covers `np.linalg.det`, `np.linalg.slogdet` through a single Numerix method.

## Examples

### Determinant of a two by two matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.det([[1, 2], [3, 4]])

console.log(value)
// -2
```

### Determinant of a single entry matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.det([[5]])

console.log(value)
// 5
```

### Determinant of an identity matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.det([[1, 0], [0, 1]])

console.log(value)
// 1
```

### Log determinant of a diagonal matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.det([[2, 0], [0, 3]], true)

console.log(value)
// {"sign":1,"logDet":1.791759469228055}
```
