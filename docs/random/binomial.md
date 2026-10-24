# binomial

Draw samples from a binomial distribution.

## API

```ts
Numeric.random.binomial(count, probability, size, generator)
```

Produces counts of successes across fixed trials.

- Parameters:
  - `count`: Number of independent trials per sample
  - `probability`: Success probability for each trial
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Covers `Generator.binomial`, `Generator.negative_binomial` through a single Numerix method.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.binomial(10, 0.5, 3, Numeric.random.seed(42))

console.log(values)
// [4,5,3]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.binomial(10, 0.5, undefined, Numeric.random.seed(42))

console.log(value)
// 4
```

### Draw samples with a low probability

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.binomial(10, 0.1, 3, Numeric.random.seed(42))

console.log(values)
// [1,1,1]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.binomial(10, 0.5, 3)

console.log(values.length)
// 3
```
