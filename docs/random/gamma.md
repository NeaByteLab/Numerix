# gamma

Draw samples from a gamma distribution.

## API

```ts
Numeric.random.gamma(shape, scale = 1, size, generator)
```

Produces variates with the given shape and scale.

- Parameters:
  - `shape`: Shape parameter of the distribution
  - `scale`: Scale parameter of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Covers `Generator.gamma`, `Generator.standard_gamma` through a single Numerix method.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.gamma(2, 1, 3, Numeric.random.seed(42))

console.log(values)
// [0.24089369158360752,2.2463503604478174,1.1073292740730007]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.gamma(2, 1, undefined, Numeric.random.seed(42))

console.log(value)
// 0.24089369158360752
```

### Draw samples with a custom scale

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.gamma(2, 2, 3, Numeric.random.seed(42))

console.log(values)
// [0.48178738316721503,4.492700720895635,2.2146585481460015]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.gamma(2, 1, 3)

console.log(values.length)
// 3
```
