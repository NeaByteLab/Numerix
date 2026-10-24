# fdist

Draw samples from an F distribution.

## API

```ts
Numeric.random.fdist(numerator, denominator, size, generator)
```

Produces variance ratio variates from given degrees of freedom.

- Parameters:
  - `numerator`: Degrees of freedom of the numerator
  - `denominator`: Degrees of freedom of the denominator
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Covers `Generator.f`, `Generator.noncentral_f` through a single Numerix method.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.fdist(3, 5, 3, Numeric.random.seed(42))

console.log(values)
// [0.055610929341492706,0.8186389593463823,0.42796238588514446]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.fdist(3, 5, undefined, Numeric.random.seed(42))

console.log(value)
// 0.055610929341492706
```

### Draw samples with more denominator freedom

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.fdist(3, 20, 3, Numeric.random.seed(42))

console.log(values)
// [0.057109210729357304,0.5893951460768124,0.5439431534732154]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.fdist(3, 5, 3)

console.log(values.length)
// 3
```
