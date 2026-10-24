# full

Create an array filled with a single repeated value.

## API

```ts
Numeric.create.full(shape, fill = 0)
```

Builds an array filled with the given value.

- Parameters:
  - `shape`: Target dimensions of the created array
  - `fill`: Value placed in every cell
- Returns: Array filled with the given value
- NumPy: Covers `np.full`, `np.full_like`, `ndarray.fill` through a single Numerix method.

## Examples

### Matrix filled with sevens

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.full([2, 2], 7)

console.log(matrix)
// [[7,7],[7,7]]
```

### Vector filled with ones

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.full([3], 1)

console.log(values)
// [1,1,1]
```

### Matrix filled with a fractional value

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.full([2, 2], 0.5)

console.log(matrix)
// [[0.5,0.5],[0.5,0.5]]
```

### Default fill value

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.full([2])

console.log(values)
// [0,0]
```
