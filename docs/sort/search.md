# search

Find the insertion position of target values in a sorted array.

## API

```ts
Numeric.sort.search(values, targets, side = 'left')
```

Locates where the targets would sit in the sorted values.

- Parameters:
  - `values`: Sorted vector of input values
  - `targets`: Values whose positions are sought
  - `side`: Side of the match used for the position
- Returns: Insertion position for each target
- NumPy: Covers `np.searchsorted`, `ndarray.searchsorted` through a single Numerix method.

## Examples

### Position of an existing value

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.sort.search([1, 2, 3, 4], 3)

console.log(index)
// 2
```

### Position from the right side

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.sort.search([1, 2, 3, 4], 3, 'right')

console.log(index)
// 3
```

### Position of a missing value

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.sort.search([1, 2, 3, 4], 5)

console.log(index)
// 4
```

### Position of a value below the range

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.sort.search([1, 2, 3, 4], 0)

console.log(index)
// 0
```
