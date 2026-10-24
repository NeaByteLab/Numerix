# pareto

Draw samples from a Pareto distribution.

## API

```ts
Numeric.random.pareto(left, size, generator)
```

Produces heavy tailed variates above one.

- Parameters:
  - `left`: Shape parameter of the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.pareto`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.pareto(2, 3, Numeric.random.seed(42))

console.log(values)
// [0.0013245733724620568,0.7157732121269562,0.06056828951948834]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.pareto(2, undefined, Numeric.random.seed(42))

console.log(value)
// 0.0013245733724620568
```

### Draw samples with a heavier tail

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.pareto(1, 3, Numeric.random.seed(42))

console.log(values)
// [0.0026509012395432574,1.9438777154524534,0.12480509673429308]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.pareto(2, 3)

console.log(values.length)
// 3
```
