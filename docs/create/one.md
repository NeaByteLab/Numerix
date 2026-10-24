# one

Create an array filled entirely with ones.

## API

```ts
Numeric.create.one(shape)
```

Builds an array filled with ones.

- Parameters:
  - `shape`: Target dimensions of the created array
- Returns: Array filled with ones
- NumPy: Covers `np.ones`, `np.ones_like` through a single Numerix method.

## Examples

### Vector of ones

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.one([3])

console.log(values)
// [1,1,1]
```

### Matrix of ones

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.one([2, 2])

console.log(matrix)
// [[1,1],[1,1]]
```

### Matrix of ones with three columns

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.one([2, 3])

console.log(matrix)
// [[1,1,1],[1,1,1]]
```

### Array holding a single one

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.one([1])

console.log(values)
// [1]
```
