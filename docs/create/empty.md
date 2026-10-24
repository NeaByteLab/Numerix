# empty

Create an array with the requested shape and uninitialised values.

## API

```ts
Numeric.create.empty(shape)
```

Builds an array with the requested dimensions.

- Parameters:
  - `shape`: Target dimensions of the created array
- Returns: Array with the requested shape
- NumPy: Covers `np.empty`, `np.empty_like` through a single Numerix method.

## Examples

### Empty matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.empty([2, 3])

console.log(matrix)
// [[0,0,0],[0,0,0]]
```

### Empty vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.empty([4])

console.log(values)
// [0,0,0,0]
```

### Empty square matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.empty([2, 2])

console.log(matrix)
// [[0,0],[0,0]]
```

### Empty array with one row

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.empty([1, 2])

console.log(matrix)
// [[0,0]]
```
