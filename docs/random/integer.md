# integer

Draw integers within an inclusive range.

## API

```ts
Numeric.random.integer(low, high, size, generator)
```

Produces integers within an inclusive range.

- Parameters:
  - `low`: Lower bound of the generated range
  - `high`: Upper bound of the generated range
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.integers`.

## Examples

### Draw three integers

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.integer(1, 10, 3, Numeric.random.seed(42))

console.log(values)
// [1,6,1]
```

### Draw a single integer

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.integer(1, 10, undefined, Numeric.random.seed(42))

console.log(value)
// 1
```

### Draw integers from a single bound

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.integer(5, undefined, 3, Numeric.random.seed(42))

console.log(values)
// [0,3,0]
```

### Draw integers without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.integer(1, 10, 3)

console.log(values.length)
// 3
```
