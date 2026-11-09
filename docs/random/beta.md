# beta

Draw samples from a beta distribution.

## API

```ts
Numeric.random.beta(first, right, count, generator)
```

Produces variates with the given shape parameters.

- Parameters:
  - `first`: First shape parameter of the distribution
  - `right`: Second shape parameter of the distribution
  - `count`: Number of samples to draw when given
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
// [0.003988037004400595,0.11554010175876135,0.7451291798392942]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.beta(2, 3, 3)

console.log(values.length)
// 3
```
