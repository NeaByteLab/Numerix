# student

Draw samples from a Student t distribution.

## API

```ts
Numeric.random.student(freedom, size, generator)
```

Produces heavy tailed variates with given freedom.

- Parameters:
  - `freedom`: Degrees of freedom for the distribution
  - `size`: Number of samples to draw when given
  - `generator`: Generator supplying uniform samples
- Returns: Single sample or array of samples
- NumPy: Equivalent to `Generator.standard_t`.

## Examples

### Draw three samples

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.student(3, 3, Numeric.random.seed(42))

console.log(values)
// [-1.2896423548200682,1.1904595815080552,0.22527504659442651]
```

### Draw a single sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.student(3, undefined, Numeric.random.seed(42))

console.log(value)
// -1.2896423548200682
```

### Draw samples with more freedom

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.student(10, 3, Numeric.random.seed(42))

console.log(values)
// [-1.469075187163098,1.046506103330278,0.20365653614136098]
```

### Draw samples without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.student(3, 3)

console.log(values.length)
// 3
```
