# chisquare

Draw samples from a chi squared distribution.

## API

```ts
Numeric.random.chisquare(freedom, size, generator)
```

Produces sums of squared standard normal variates.

- Parameters:
  - `freedom`: Number of degrees of freedom
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Covers `Generator.chisquare`, `Generator.noncentral_chisquare` through a single Numerix method.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.chisquare(3, 3, Numeric.random.seed(42))

console.log(values)
// [0.1881497225216913,3.3225732456444947,1.4214269032218791]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.chisquare(3, undefined, Numeric.random.seed(42))

console.log(value)
// 0.1881497225216913
```

### Draw samples with more freedom

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.chisquare(10, 3, Numeric.random.seed(42))

console.log(values)
// [3.4260889768257408,11.195535751234916,7.359543738013657]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.chisquare(3, 3)

console.log(values.length)
// 3
```
