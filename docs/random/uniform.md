# uniform

Draw samples spread evenly over a range.

## API

```ts
Numeric.random.uniform(low = 0, high = 1, size, generator)
```

Produces variates spread evenly over the given range.

- Parameters:
  - `low`: Lower bound of the distribution
  - `high`: Upper bound of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Covers `Generator.random`, `Generator.uniform` through a single Numerix method.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.uniform(0, 1, 3, Numeric.random.seed(42))

console.log(values)
// [0.002643892541527748,0.660311977379024,0.11095708678476512]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.uniform(0, 1, undefined, Numeric.random.seed(42))

console.log(value)
// 0.002643892541527748
```

### Draw samples over a custom range

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.uniform(10, 20, 3, Numeric.random.seed(42))

console.log(values)
// [10.026438925415277,16.60311977379024,11.109570867847651]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.uniform(0, 1, 3)

console.log(values.length)
// 3
```
