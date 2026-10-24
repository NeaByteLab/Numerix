# average

Compute the weighted arithmetic mean of an array.

## API

```ts
Numeric.stat.average(left, weights)
```

Averages the values with the supplied weights.

- Parameters:
  - `left`: Vector or matrix of input values
  - `weights`: Weights applied to each value
- Returns: Weighted mean of the values
- NumPy: Equivalent to `np.average`.

## Examples

### Mean of a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.average([1, 2, 3])

console.log(value)
// 2
```

### Weighted mean of a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.average([1, 2, 3], [1, 1, 2])

console.log(value)
// 2.25
```

### Weighted mean with equal weights

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.average([1, 2, 3], [1, 1, 1])

console.log(value)
// 2
```

### Weighted mean favouring the last value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.average([0, 10], [1, 3])

console.log(value)
// 7.5
```
