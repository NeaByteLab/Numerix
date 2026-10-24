# norm

Measure the magnitude of a vector or matrix.

## API

```ts
Numeric.linalg.norm(input, order)
```

Measures magnitude using the requested order.

- Parameters:
  - `input`: Vector or matrix whose norm is computed
  - `order`: Norm order or named variant
- Returns: Magnitude of the input
- NumPy: Covers `np.linalg.norm`, `np.linalg.matrix_norm`, `np.linalg.vector_norm` through a single Numerix method.

## Examples

### Euclidean norm of a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.norm([3, 4])

console.log(value)
// 5
```

### Frobenius norm of a matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.norm([[1, 2], [3, 4]])

console.log(value)
// 5.477225575051661
```

### Infinity norm of a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.norm([3, 4], 'inf')

console.log(value)
// 4
```

### Nuclear norm of a matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.norm([[1, 2], [3, 4]], 'nuc')

console.log(value)
// 5.830951894845302
```
