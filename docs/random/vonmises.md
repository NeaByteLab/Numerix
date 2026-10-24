# vonmises

Draw samples from a von Mises distribution.

## API

```ts
Numeric.random.vonmises(mean, kappa, size, generator)
```

Produces circular variates around the given mean angle.

- Parameters:
  - `mean`: Mean direction of the distribution
  - `kappa`: Concentration parameter of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.vonmises`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.vonmises(0, 1, 3, Numeric.random.seed(42))

console.log(values)
// [-0.004035655810651129,0.5512781802306952,1.629424105499174]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.vonmises(0, 1, undefined, Numeric.random.seed(42))

console.log(value)
// -0.004035655810651129
```

### Draw samples around a custom mean

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.vonmises(3.14159, 1, 3, Numeric.random.seed(42))

console.log(values)
// [3.1375543441893488,-2.590317126948891,-1.5121712016804123]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.vonmises(0, 1, 3)

console.log(values.length)
// 3
```
