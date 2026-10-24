# laplace

Draw samples from a Laplace distribution.

## API

```ts
Numeric.random.laplace(center = 0, scale = 1, size, generator)
```

Produces symmetric variates around the given center.

- Parameters:
  - `center`: Location parameter of the distribution
  - `scale`: Scale parameter of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.laplace`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.laplace(0, 1, 3, Numeric.random.seed(42))

console.log(values)
// [-5.242355819646064,0.38658048257323485,-1.5054645774037037]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.laplace(0, 1, undefined, Numeric.random.seed(42))

console.log(value)
// -5.242355819646064
```

### Draw samples around a custom center

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.laplace(10, 1, 3, Numeric.random.seed(42))

console.log(values)
// [4.757644180353936,10.386580482573235,8.494535422596297]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.laplace(0, 1, 3)

console.log(values.length)
// 3
```
