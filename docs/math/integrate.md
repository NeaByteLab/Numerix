# integrate

Integrate sampled values numerically using the trapezoidal rule.

## API

```ts
Numeric.math.integrate(samples, points, spacing = 1)
```

Applies trapezoidal integration over vector or matrix samples.

- Parameters:
  - `samples`: Sampled values to integrate
  - `points`: Optional integration boundaries within the samples
  - `spacing`: Distance between consecutive samples
- Returns: Integral of the sampled values
- NumPy: Equivalent to `np.trapezoid`.

## Examples

### Integrate samples over explicit points

```ts
import Numeric from '@neabyte/numerix'

const area = Numeric.math.integrate([1, 2, 3], [0, 1, 2])

console.log(area)
// 4
```

### Integrate samples with a fixed spacing

```ts
import Numeric from '@neabyte/numerix'

const area = Numeric.math.integrate([1, 2, 3, 4])

console.log(area)
// 7.5
```

### Integrate with a custom spacing

```ts
import Numeric from '@neabyte/numerix'

const area = Numeric.math.integrate([1, 2, 3], undefined, 2)

console.log(area)
// 8
```

### Integrate each row of a matrix

```ts
import Numeric from '@neabyte/numerix'

const areas = Numeric.math.integrate([[1, 2, 3], [4, 5, 6]], [0, 1, 2])

console.log(areas)
// [4,10]
```
