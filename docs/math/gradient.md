# gradient

Estimate derivatives from adjacent sample differences.

## API

```ts
Numeric.math.gradient(samples, spacing = 1)
```

Estimates derivatives from adjacent sample differences.

- Parameters:
  - `samples`: Sampled values to differentiate
  - `spacing`: Distance between consecutive samples
- Returns: Gradient estimates for each interior sample
- NumPy: Equivalent to `np.gradient`.

## Examples

### Gradient of a sampled vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.gradient([1, 2, 4, 8])

console.log(values)
// [1,1.5,3,4]
```

### Gradient with a custom sample spacing

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.gradient([1, 2, 4, 8], 2)

console.log(values)
// [0.5,0.75,1.5,2]
```

### Gradient of a quadratic sample

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.gradient([0, 1, 4, 9, 16])

console.log(values)
// [1,2,4,6,7]
```

### Gradient of a single sample

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.gradient([5])

console.log(values)
// [0]
```
