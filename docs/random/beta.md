# beta

Draw samples from a beta distribution.

## API

```ts
Numeric.random.beta(left, right, size, generator)
```

Produces variates with the given shape parameters.

- Parameters:
  - `left`: First shape parameter of the distribution
  - `right`: Second shape parameter of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.beta`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.beta(2, 3, 3, Numeric.random.seed(42))

console.log(values)
// [0.06644594916358885,0.37344703904952975,0.241990668970862]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.beta(2, 3, undefined, Numeric.random.seed(42))

console.log(value)
// 0.06644594916358885
```

### Draw samples with symmetric shapes

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.beta(1, 1, 3, Numeric.random.seed(42))

console.log(values)
// [0.009617971155951107,0.5243634341534608,0.22836720010144887]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.beta(2, 3, 3)

console.log(values.length)
// 3
```
