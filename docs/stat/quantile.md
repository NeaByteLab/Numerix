# quantile

Compute the quantile or percentile of an array.

## API

```ts
Numeric.stat.quantile(values, probability, percentile = false, skip = false)
```

Finds the requested quantile of the sorted entries.

- Parameters:
  - `values`: Vector or matrix of input values
  - `probability`: Quantile position between zero and one
  - `percentile`: When true reads the probability as a percentage
  - `skip`: Whether invalid entries are skipped
- Returns: Quantile matching the requested probability
- NumPy: Covers `np.quantile`, `np.nanquantile`, `np.percentile`, `np.nanpercentile` through a single Numerix method.

## Examples

### Median quantile of a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.quantile([1, 2, 3, 4], 0.5)

console.log(value)
// 2.5
```

### Median percentile of a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.quantile([1, 2, 3, 4], 50, true)

console.log(value)
// 2.5
```

### Lowest quantile of a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.quantile([1, 2, 3, 4], 0)

console.log(value)
// 1
```

### Highest quantile of a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.quantile([1, 2, 3, 4], 1)

console.log(value)
// 4
```
