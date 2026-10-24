# digitize

Find which bin each value falls into.

## API

```ts
Numeric.stat.digitize(values, bins, right = false)
```

Reports the bin index of every value.

- Parameters:
  - `values`: Values placed into the bins
  - `bins`: Bin edges used for the grouping
  - `right`: When true returns the bin on the right of the edge
- Returns: Bin index for each value
- NumPy: Equivalent to `np.digitize`.

## Examples

### Bin index of each value

```ts
import Numeric from '@neabyte/numerix'

const bins = Numeric.stat.digitize([1, 5, 9], [2, 6])

console.log(bins)
// [0,1,2]
```

### Bin index with right sided edges

```ts
import Numeric from '@neabyte/numerix'

const bins = Numeric.stat.digitize([1, 5, 9], [2, 6], true)

console.log(bins)
// [0,1,2]
```

### Bin index with more edges

```ts
import Numeric from '@neabyte/numerix'

const bins = Numeric.stat.digitize([1, 3, 5, 7], [2, 4, 6])

console.log(bins)
// [0,1,2,3]
```

### Bin index of values below every edge

```ts
import Numeric from '@neabyte/numerix'

const bins = Numeric.stat.digitize([0, 1], [5, 10])

console.log(bins)
// [0,0]
```
