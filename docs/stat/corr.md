# corr

Compute the correlation coefficient between two paired samples.

## API

```ts
Numeric.stat.corr(values, partner, mode = 'pearson')
```

Measures how strongly two samples move together.

- Parameters:
  - `values`: First sample of paired values
  - `partner`: Second sample of paired values
  - `mode`: Correlation method applied to the samples
- Returns: Correlation matrix of the paired samples
- NumPy: Covers `np.corrcoef`, `np.correlate` through a single Numerix method.

## Examples

### Correlation of two matching samples

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.corr([1, 2, 3], [2, 4, 6])

console.log(value)
// [[0.9999999999999998,0.9999999999999998],[0.9999999999999998,0.9999999999999998]]
```

### Spearman rank correlation

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.corr([1, 2, 3], [2, 4, 6], 'spearman')

console.log(value)
// [[0.9999999999999998,0.9999999999999998],[0.9999999999999998,0.9999999999999998]]
```

### Correlation of reversed samples

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.corr([1, 2, 3], [3, 2, 1])

console.log(value)
// [[0.9999999999999998,-0.9999999999999998],[-0.9999999999999998,0.9999999999999998]]
```

### Correlation of constant samples

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.corr([2, 2, 2], [2, 2, 2])

console.log(value)
// [["NaN","NaN"],["NaN","NaN"]]
```
