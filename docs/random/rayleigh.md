# rayleigh

Draw samples from a Rayleigh distribution.

## API

```ts
Numeric.random.rayleigh(scale = 1, size, generator)
```

Produces magnitudes of two dimensional normal vectors.

- Parameters:
  - `scale`: Scale parameter of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.rayleigh`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.rayleigh(1, 3, Numeric.random.seed(42))

console.log(values)
// [0.07276529115000234,1.4695085322196535,0.48499437790562727]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.rayleigh(1, undefined, Numeric.random.seed(42))

console.log(value)
// 0.07276529115000234
```

### Draw samples with a custom scale

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.rayleigh(2, 3, Numeric.random.seed(42))

console.log(values)
// [0.14553058230000468,2.939017064439307,0.9699887558112545]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.rayleigh(1, 3)

console.log(values.length)
// 3
```
