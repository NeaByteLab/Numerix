# wald

Draw samples from a Wald distribution.

## API

```ts
Numeric.random.wald(center, scale, count, generator)
```

Produces positive variates with the given mean.

- Parameters:
  - `center`: Mean of the distribution
  - `scale`: Scale parameter of the distribution
  - `count`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.wald`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.wald(1, 1, 3, Numeric.random.seed(42))

console.log(values)
// [0.1925020019494288,0.6686880737204821,1.6300152436707458]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.wald(1, 1, undefined, Numeric.random.seed(42))

console.log(value)
// 0.1925020019494288
```

### Draw samples with a custom mean

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.wald(3, 1, 3, Numeric.random.seed(42))

console.log(values)
// [0.2483655269751459,1.5075899790052645,6.884220369335507]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.wald(1, 1, 3)

console.log(values.length)
// 3
```
