# flip

Reverse entries along one axis or across every axis.

## API

```ts
Numeric.shape.flip(input, axis = 0)
```

Reverses rows, columns, or every axis.

- Parameters:
  - `input`: Nested array to reverse
  - `axis`: Axis or named direction to reverse
- Returns: Reversed array matching the input nesting
- NumPy: Covers `np.flip`, `np.fliplr`, `np.flipud` through a single Numerix method.

## Examples

### Reverse the rows of a matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.flip([[1, 2], [3, 4]])

console.log(matrix)
// [[3,4],[1,2]]
```

### Reverse the columns of a matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.flip([[1, 2], [3, 4]], 1)

console.log(matrix)
// [[2,1],[4,3]]
```

### Reverse every axis

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.flip([[1, 2], [3, 4]], 'all')

console.log(matrix)
// [[4,3],[2,1]]
```

### Reverse rows with the named direction

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.flip([[1, 2], [3, 4]], 'ud')

console.log(matrix)
// [[3,4],[1,2]]
```
