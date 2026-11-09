# histogram

Count the values falling into each bin of a histogram.

## API

```ts
Numeric.stat.histogram(values, count = 10, bounds, density, final = false)
```

Counts values falling into each bin.

- Parameters:
  - `values`: Values to distribute across the bins
  - `count`: Number of bins or explicit bin edges
  - `bounds`: Value range covered by the bins or density flag
  - `density`: Density flag or optional sample weights
  - `final`: When true normalizes weighted counts to density
- Returns: Bin counts with edges or a two dimensional grid
- NumPy: Covers `np.histogram`, `np.histogram2d`, `np.histogramdd`, `np.histogram_bin_edges` through a single Numerix method.

## Examples

### Histogram with two bins

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.stat.histogram([1, 2, 2, 3], 2)

console.log(result)
// {"counts":[1,3],"edges":[1,2,3]}
```

### Histogram with an explicit range

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.stat.histogram([1, 2, 2, 3], 2, [0, 4])

console.log(result)
// {"counts":[1,3],"edges":[0,2,4]}
```

### Histogram with the default bin count

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.stat.histogram([1, 2, 3])

console.log(result)
// {"counts":[1,0,0,0,0,1,0,0,0,1],"edges":[1,1.2,1.4,1.6,1.8,2,2.2,2.4000000000000004,2.6,2.8,3]}
```

### Histogram with a wider range

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.stat.histogram([1, 2, 2, 3], 2, [0, 10])

console.log(result)
// {"counts":[4,0],"edges":[0,5,10]}
```
