# inv

Compute the inverse of a matrix.

## API

```ts
Numeric.linalg.inv(matrix, pseudo = false)
```

Computes the inverse through Gaussian elimination.

- Parameters:
  - `matrix`: Matrix to invert
  - `pseudo`: When true computes the Moore Penrose inverse
- Returns: Inverse of the given matrix
- NumPy: Covers `np.linalg.inv`, `np.linalg.pinv`, `np.linalg.tensorinv` through a single Numerix method.

## Examples

### Inverse of a two by two matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.inv([[1, 2], [3, 4]])

console.log(value)
// [[-1.9999999999999996,0.9999999999999998],[1.4999999999999998,-0.4999999999999999]]
```

### Inverse of the identity matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.inv([[1, 0], [0, 1]])

console.log(value)
// [[1,0],[0,1]]
```

### Pseudo inverse of a rectangular matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.inv([[1, 2, 3]], true)

console.log(value)
// [[0.07142857142857141],[0.14285714285714282],[0.21428571428571422]]
```

### Inverse of a scaled matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.inv([[2, 0], [0, 4]])

console.log(value)
// [[0.5,0],[0,0.25]]
```
