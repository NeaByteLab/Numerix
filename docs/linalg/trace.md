# trace

Sum the diagonal entries of a matrix.

## API

```ts
Numeric.linalg.trace(matrix, offset = 0)
```

Sums the diagonal entries along the requested offset.

- Parameters:
  - `matrix`: Matrix whose diagonal entries are summed
  - `offset`: Diagonal offset used for the summation
- Returns: Sum of the selected diagonal entries
- NumPy: Covers `np.trace`, `np.linalg.trace`, `ndarray.trace` through a single Numerix method.

## Examples

### Trace of a two by two matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.trace([[1, 2], [3, 4]])

console.log(value)
// 5
```

### Trace of a three by three matrix

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.trace([[1, 0, 0], [0, 2, 0], [0, 0, 3]])

console.log(value)
// 6
```

### Trace along the upper diagonal

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.trace([[1, 2], [3, 4]], 1)

console.log(value)
// 2
```

### Trace along the lower diagonal

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.trace([[1, 2], [3, 4]], -1)

console.log(value)
// 3
```
