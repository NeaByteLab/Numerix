# geometric

Draw samples from a geometric distribution.

## API

```ts
Numeric.random.geometric(probability, size, generator)
```

Produces counts of trials before the first success.

- Parameters:
  - `probability`: Success probability for each trial
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Covers `Generator.geometric`, `Generator.hypergeometric`, `Generator.multivariate_hypergeometric` through a single Numerix method.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.geometric(0.5, 3, Numeric.random.seed(42))

console.log(values)
// [1,2,1]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.geometric(0.5, undefined, Numeric.random.seed(42))

console.log(value)
// 1
```

### Draw samples with a low probability

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.geometric(0.1, 3, Numeric.random.seed(42))

console.log(values)
// [1,11,2]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.geometric(0.5, 3)

console.log(values.length)
// 3
```
