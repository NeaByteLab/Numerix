# spacing

Measure the gap between a value and its next representable neighbour.

## API

```ts
Numeric.math.spacing(value)
```

Measures the gap to the next floating point number.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Spacing values matching the input nesting shape
- NumPy: Equivalent to `np.spacing`.

## Examples

### Spacing above one

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.spacing(1)

console.log(value)
// 2.220446049250313e-16
```

### Spacing below one

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.spacing(0.5)

console.log(value)
// 1.1102230246251565e-16
```

### Spacings of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.spacing([1, 100])

console.log(values)
// [2.220446049250313e-16,1.4210854715202004e-14]
```

### Spacing of a negative value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.spacing(-1)

console.log(value)
// -2.220446049250313e-16
```
