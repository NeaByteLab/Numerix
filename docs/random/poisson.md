# poisson

Draw samples from a Poisson distribution.

## API

```ts
Numeric.random.poisson(intensity = 1, size, generator)
```

Produces counts of events in an interval.

- Parameters:
  - `intensity`: Expected number of events per interval
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.poisson`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.poisson(3, 3, Numeric.random.seed(42))

console.log(values)
// [0,4,5]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.poisson(3, undefined, Numeric.random.seed(42))

console.log(value)
// 0
```

### Draw samples with a higher intensity

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.poisson(10, 3, Numeric.random.seed(42))

console.log(values)
// [6,10,12]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.poisson(3, 3)

console.log(values.length)
// 3
```
