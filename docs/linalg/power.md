# power

Raise a matrix to an integer power.

## API

```ts
Numeric.linalg.power(matrix, exponent)
```

Computes the matrix power through repeated multiplication.

- Parameters:
  - `matrix`: Matrix to raise
  - `exponent`: Integer power applied to the matrix
- Returns: Matrix raised to the requested power
- NumPy: Equivalent to `np.linalg.matrix_power`.

## Examples

### Square of a two by two matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.power([[1, 2], [3, 4]], 2)

console.log(value)
// [[7,10],[15,22]]
```

### Zero power returns the identity matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.power([[1, 2], [3, 4]], 0)

console.log(value)
// [[1,0],[0,1]]
```

### Cube of a diagonal matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.power([[2, 0], [0, 3]], 3)

console.log(value)
// [[8,0],[0,27]]
```

### First power returns the matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.power([[1, 2], [3, 4]], 1)

console.log(value)
// [[1,2],[3,4]]
```
