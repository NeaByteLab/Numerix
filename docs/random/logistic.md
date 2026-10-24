# logistic

Draw samples from a logistic distribution.

## API

```ts
Numeric.random.logistic(center = 0, scale = 1, size, generator)
```

Produces variates around the given center.

- Parameters:
  - `center`: Location parameter of the distribution
  - `scale`: Scale parameter of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.logistic`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.logistic(0, 1, 3, Numeric.random.seed(42))

console.log(values)
// [-5.932855606407936,0.6646848004858936,-2.0810019846636156]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.logistic(0, 1, undefined, Numeric.random.seed(42))

console.log(value)
// -5.932855606407936
```

### Draw samples around a custom center

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.logistic(10, 1, 3, Numeric.random.seed(42))

console.log(values)
// [4.067144393592064,10.664684800485894,7.918998015336385]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.logistic(0, 1, 3)

console.log(values.length)
// 3
```
