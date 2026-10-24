# zipf

Draw samples from a Zipf distribution.

## API

```ts
Numeric.random.zipf(left, size, generator)
```

Produces rank weighted variates from the given exponent.

- Parameters:
  - `left`: Exponent parameter of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.zipf`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.zipf(2, 3, Numeric.random.seed(42))

console.log(values)
// [1,1,8]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.zipf(2, undefined, Numeric.random.seed(42))

console.log(value)
// 1
```

### Draw samples with a larger exponent

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.zipf(3, 3, Numeric.random.seed(42))

console.log(values)
// [1,1,2]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.zipf(2, 3)

console.log(values.length)
// 3
```
