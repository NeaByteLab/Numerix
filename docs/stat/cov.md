# cov

Compute the covariance between two paired samples.

## API

```ts
Numeric.stat.cov(values, partner, freedom = 1)
```

Measures how two samples vary together.

- Parameters:
  - `values`: First sample of paired values
  - `partner`: Second sample of paired values
  - `freedom`: Degrees of freedom correction applied
- Returns: Covariance matrix of the paired samples
- NumPy: Equivalent to `np.cov`.

## Examples

### Covariance of two samples

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.cov([1, 2, 3], [2, 4, 6])

console.log(value)
// [[1,2],[2,4]]
```

### Covariance without a degrees of freedom correction

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.cov([1, 2, 3], [2, 4, 6], 0)

console.log(value)
// [[0.6666666666666666,1.3333333333333333],[1.3333333333333333,2.6666666666666665]]
```

### Covariance of uncorrelated samples

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.cov([1, 2, 3], [3, 2, 1])

console.log(value)
// [[1,-1],[-1,1]]
```

### Covariance of constant samples

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.cov([2, 2], [2, 2])

console.log(value)
// [[0,0],[0,0]]
```
