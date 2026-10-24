# qr

Compute the QR decomposition of a matrix.

## API

```ts
Numeric.linalg.qr(matrix)
```

Decomposes the matrix into orthogonal and upper triangular factors.

- Parameters:
  - `matrix`: Matrix to decompose
- Returns: Orthogonal factor with the upper triangular factor
- NumPy: Equivalent to `np.linalg.qr`.

## Examples

### Decompose a two by two matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.qr([[1, 2], [3, 4]])

console.log(value)
// {"Q":[[-0.3162277660168378,0.9486832980505135],[-0.9486832980505135,-0.3162277660168381]],"R":[[-3.1622776601683795,-4.427188724235729],[0,0.6324555320336742]]}
```

### Decompose the identity matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.qr([[1, 0], [0, 1]])

console.log(value)
// {"Q":[[-1,0],[0,-1]],"R":[[-1,0],[0,-1]]}
```

### Decompose a single row matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.qr([[3, 4]])

console.log(value)
// {"Q":[[-1,0]],"R":[[-3,-4],[0,0]]}
```

### Decompose a triangular matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.qr([[2, 0], [0, 3]])

console.log(value)
// {"Q":[[-1,0],[0,-1]],"R":[[-2,0],[0,-3]]}
```
