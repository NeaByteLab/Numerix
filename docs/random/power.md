# power

Draw samples from a power law distribution.

## API

```ts
Numeric.random.power(left, size, generator)
```

Produces variates from a power law distribution.

- Parameters:
  - `left`: Exponent parameter of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.power`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.power(2, 3, Numeric.random.seed(42))

console.log(values)
// [0.05141879560557353,0.8125958265823324,0.33310221672148194]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.power(2, undefined, Numeric.random.seed(42))

console.log(value)
// 0.05141879560557353
```

### Draw samples with a steeper exponent

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.power(4, 3, Numeric.random.seed(42))

console.log(values)
// [0.22675712911741835,0.9014409723228318,0.5771500816265055]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.power(2, 3)

console.log(values.length)
// 3
```
