# mesh

Build a coordinate grid from two axes of values.

## API

```ts
Numeric.create.mesh(rows, columns, indexing = 'xy')
```

Builds coordinate arrays for each grid axis.

- Parameters:
  - `rows`: Coordinates along the first axis
  - `columns`: Coordinates along the second axis
  - `indexing`: Indexing order of the returned grid
- Returns: Grid of coordinate arrays
- NumPy: Covers `np.meshgrid`, `np.indices`, `np.ix_` through a single Numerix method.

## Examples

### Grid from two coordinate axes

```ts
import Numeric from '@neabyte/numerix'

const grid = Numeric.create.mesh([1, 2], [3, 4])

console.log(grid)
// [[[1,2],[1,2]],[[3,3],[4,4]]]
```

### Grid with matrix indexing order

```ts
import Numeric from '@neabyte/numerix'

const grid = Numeric.create.mesh([1, 2], [3, 4], 'ij')

console.log(grid)
// [[[1,1],[2,2]],[[3,4],[3,4]]]
```

### Grid from a single axis

```ts
import Numeric from '@neabyte/numerix'

const grid = Numeric.create.mesh([1, 2, 3])

console.log(grid)
// [[[0,0]],[[0,1]]]
```
