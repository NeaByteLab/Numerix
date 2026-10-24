# unravel

Convert a flat index into its coordinate along each axis.

## API

```ts
Numeric.index.unravel(index, dimensions)
```

Computes the position of an offset along each axis.

- Parameters:
  - `index`: Flat offset to convert
  - `dimensions`: Length of each axis
- Returns: Coordinate along each axis
- NumPy: Equivalent to `np.unravel_index`.

## Examples

### Coordinates of the last cell

```ts
import Numeric from '@neabyte/numerix'

const coordinates = Numeric.index.unravel(3, [2, 2])

console.log(coordinates)
// [1,1]
```

### Coordinates of the first cell

```ts
import Numeric from '@neabyte/numerix'

const coordinates = Numeric.index.unravel(0, [2, 2])

console.log(coordinates)
// [0,0]
```

### Coordinates within a single axis

```ts
import Numeric from '@neabyte/numerix'

const coordinates = Numeric.index.unravel(2, [5])

console.log(coordinates)
// [2]
```

### Coordinates of a three dimensional cell

```ts
import Numeric from '@neabyte/numerix'

const coordinates = Numeric.index.unravel(13, [2, 3, 4])

console.log(coordinates)
// [1,0,1]
```
