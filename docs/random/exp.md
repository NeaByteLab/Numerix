# exp

Draw samples from an exponential distribution.

## API

```ts
Numeric.random.exp(scale = 1, size, generator)
```

Produces variates with the given scale parameter.

- Parameters:
  - `scale`: Scale parameter of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Covers `Generator.exponential`, `Generator.standard_exponential` through a single Numerix method.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.exp(1, 3, Numeric.random.seed(42))

console.log(values)
// [0.002647393798072305,1.0797276631331802,0.11760977330003321]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.exp(1, undefined, Numeric.random.seed(42))

console.log(value)
// 0.002647393798072305
```

### Draw samples with a custom scale

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.exp(2, 3, Numeric.random.seed(42))

console.log(values)
// [0.00529478759614461,2.1594553262663605,0.23521954660006641]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.exp(1, 3)

console.log(values.length)
// 3
```
