# cauchy

Draw samples from a Cauchy distribution.

## API

```ts
Numeric.random.cauchy(size, generator)
```

Produces heavy tailed variates around the origin.

- Parameters:
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.standard_cauchy`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.cauchy(3, Numeric.random.seed(42))

console.log(values)
// [-120.39164264959886,0.5510316640830796,-2.7516194530210365]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.cauchy(undefined, Numeric.random.seed(42))

console.log(value)
// -120.39164264959886
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.cauchy(3)

console.log(values.length)
// 3
```

### Draw samples with a different seed

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.cauchy(3, Numeric.random.seed(7))

console.log(values)
// [-722.3618080804108,-2.7907756810731907,3.2108974669410357]
```
