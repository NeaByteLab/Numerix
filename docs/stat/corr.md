# corr

Compute the correlation coefficient between two paired samples.

## API

```ts
Numeric.stat.corr(values, other, method = 'pearson', window = 'valid')
```

Measures how strongly two samples move together.

- Parameters:
  - `values`: First sample of paired values
  - `other`: Second sample of paired values
  - `method`: Correlation method applied to the samples
  - `window`: Cross-correlation mode or row-variable flag
- Returns: Correlation matrix of the paired samples
- NumPy: Covers `np.corrcoef`, `np.correlate` through a single Numerix method.

## Examples

### Correlation of two matching samples

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.corr([1, 2, 3], [2, 4, 6])

console.log(value)
// [[1,1],[1,1]]
```

### Spearman rank correlation

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.corr([1, 2, 3], [2, 4, 6], 'spearman')

console.log(value)
// [[1,1],[1,1]]
```

### Correlation of reversed samples

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.corr([1, 2, 3], [3, 2, 1])

console.log(value)
// [[1,-1],[-1,1]]
```

### Correlation of constant samples

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.corr([2, 2, 2], [2, 2, 2])

console.log(value)
// [[null,null],[null,null]]
```
