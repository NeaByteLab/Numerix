# logseries

Draw samples from a logarithmic series distribution.

## API

```ts
Numeric.random.logseries(probability, size, generator)
```

Produces counts drawn from a logarithmic distribution.

- Parameters:
  - `probability`: Success probability of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.logseries`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.logseries(0.5, 3, Numeric.random.seed(42))

console.log(values)
// [6,3,1]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.logseries(0.5, undefined, Numeric.random.seed(42))

console.log(value)
// 6
```

### Draw samples with a low probability

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.logseries(0.1, 3, Numeric.random.seed(42))

console.log(values)
// [3,1,1]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.logseries(0.5, 3)

console.log(values.length)
// 3
```
