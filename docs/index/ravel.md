# ravel

Convert a coordinate pair into a flat row-major index.

## API

```ts
Numeric.index.ravel(coordinates, dimensions)
```

Computes the row-major offset of a coordinate.

- Parameters:
  - `coordinates`: Position along each axis
  - `dimensions`: Length of each axis
- Returns: Flat index of the given coordinates
- NumPy: Equivalent to `np.ravel_multi_index`.

## Examples

### Flat index of the last cell

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.index.ravel([1, 1], [2, 2])

console.log(index)
// 3
```

### Flat index of the first cell

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.index.ravel([0, 0], [2, 2])

console.log(index)
// 0
```

### Flat index of a middle cell

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.index.ravel([1, 0], [2, 2])

console.log(index)
// 2
```

### Flat index within a single axis

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.index.ravel([2], [5])

console.log(index)
// 2
```
