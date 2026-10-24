# zero

Create an array filled entirely with zeros.

## API

```ts
Numeric.create.zero(shape)
```

Builds an array filled with zeros.

- Parameters:
  - `shape`: Target dimensions of the created array
- Returns: Array filled with zeros
- NumPy: Covers `np.zeros`, `np.zeros_like` through a single Numerix method.

## Examples

### Zero matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.zero([2, 2])

console.log(matrix)
// [[0,0],[0,0]]
```

### Zero vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.zero([3])

console.log(values)
// [0,0,0]
```

### Zero matrix with three columns

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.zero([2, 3])

console.log(matrix)
// [[0,0,0],[0,0,0]]
```

### Zero array with a single cell

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.zero([1])

console.log(values)
// [0]
```
