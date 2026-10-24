# gumbel

Draw samples from a Gumbel distribution.

## API

```ts
Numeric.random.gumbel(center = 0, scale = 1, size, generator)
```

Produces extreme value variates with the given location.

- Parameters:
  - `center`: Location parameter of the distribution
  - `scale`: Scale parameter of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.gumbel`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.gumbel(0, 1, 3, Numeric.random.seed(42))

console.log(values)
// [5.934179595335869,-0.07670884557192639,2.140383140677948]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.gumbel(0, 1, undefined, Numeric.random.seed(42))

console.log(value)
// 5.934179595335869
```

### Draw samples around a custom center

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.gumbel(10, 1, 3, Numeric.random.seed(42))

console.log(values)
// [15.93417959533587,9.923291154428073,12.140383140677947]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.gumbel(0, 1, 3)

console.log(values.length)
// 3
```
