# normal

Draw samples from a normal distribution.

## API

```ts
Numeric.random.normal(center = 0, scale = 1, size, generator)
```

Produces variates around the given center.

- Parameters:
  - `center`: Location parameter of the distribution
  - `scale`: Standard deviation of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Covers `Generator.normal`, `Generator.standard_normal`, `Generator.lognormal`, `Generator.multivariate_normal` through a single Numerix method.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.normal(0, 1, 3, Numeric.random.seed(42))

console.log(values)
// [-1.8404491768878464,1.2259084896854708,-0.2642704574471453]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.normal(0, 1, undefined, Numeric.random.seed(42))

console.log(value)
// -1.8404491768878464
```

### Draw samples around a custom center

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.normal(10, 1, 3, Numeric.random.seed(42))

console.log(values)
// [8.159550823112154,11.225908489685471,9.735729542552855]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.normal(0, 1, 3)

console.log(values.length)
// 3
```
