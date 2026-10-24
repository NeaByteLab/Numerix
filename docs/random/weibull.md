# weibull

Draw samples from a Weibull distribution.

## API

```ts
Numeric.random.weibull(left, size, generator)
```

Produces positive variates with the given shape.

- Parameters:
  - `left`: Shape parameter of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.weibull`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.weibull(2, 3, Numeric.random.seed(42))

console.log(values)
// [0.05145283080718013,1.0390994481440072,0.3429428134544201]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.weibull(2, undefined, Numeric.random.seed(42))

console.log(value)
// 0.05145283080718013
```

### Draw samples with a larger shape

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.weibull(5, 3, Numeric.random.seed(42))

console.log(values)
// [0.3051853692167216,1.0154600582012812,0.6517614696188874]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.weibull(2, 3)

console.log(values.length)
// 3
```
