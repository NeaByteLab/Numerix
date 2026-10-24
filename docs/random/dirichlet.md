# dirichlet

Draw probability vectors from a Dirichlet distribution.

## API

```ts
Numeric.random.dirichlet(alpha, size, generator)
```

Produces probability vectors from given concentration values.

- Parameters:
  - `alpha`: Concentration parameter for each component
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample vector or array of sample vectors
- NumPy: Equivalent to `Generator.dirichlet`.

## Examples

### Draw two sample vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.dirichlet([1, 2, 3], 2, Numeric.random.seed(42))

console.log(values)
// [[0.002442288295843998,0.5353698324262086,0.46218787927794736],[0.044143550493505636,0.23130834165618955,0.7245481078503048]]
```

### Draw a single sample vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.dirichlet([1, 2, 3], undefined, Numeric.random.seed(42))

console.log(values)
// [0.002442288295843998,0.5353698324262086,0.46218787927794736]
```

### Draw samples with equal concentrations

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.dirichlet([1, 1], 2, Numeric.random.seed(42))

console.log(values)
// [[0.009617971155951107,0.9903820288440489],[0.5243634341534608,0.4756365658465392]]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.dirichlet([1, 2, 3], 2)

console.log(values.length)
// 2
```
