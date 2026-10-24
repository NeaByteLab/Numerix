# triangular

Draw samples from a triangular distribution.

## API

```ts
Numeric.random.triangular(left, mode, right, size, generator)
```

Produces variates between the bounds and the mode.

- Parameters:
  - `left`: Lower bound of the distribution
  - `mode`: Most likely value of the distribution
  - `right`: Upper bound of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.triangular`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.triangular(0, 1, 2, 3, Numeric.random.seed(42))

console.log(values)
// [0.07271715810629219,1.1757572898460358,0.47107767254406174]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.triangular(0, 1, 2, undefined, Numeric.random.seed(42))

console.log(value)
// 0.07271715810629219
```

### Draw samples with a shifted range

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.triangular(10, 12, 14, 3, Numeric.random.seed(42))

console.log(values)
// [10.145434316212585,12.351514579692072,10.942155345088123]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.triangular(0, 1, 2, 3)

console.log(values.length)
// 3
```
