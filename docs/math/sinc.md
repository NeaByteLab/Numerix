# sinc

Evaluate the normalized sinc function for every element.

## API

```ts
Numeric.math.sinc(value)
```

Applies the normalized sinc across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Sinc values matching the input nesting shape
- NumPy: Equivalent to `np.sinc`.

## Examples

### Sinc value at the origin

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.sinc(0)

console.log(value)
// 1
```

### Sinc value at one

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.sinc(1)

console.log(value)
// 3.8981718325193755e-17
```

### Sinc values of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.sinc([0, 1, 2])

console.log(values)
// [1,3.8981718325193755e-17,-3.8981718325193755e-17]
```

### Sinc values of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.sinc([[0, 1], [2, 3]])

console.log(values)
// [[1,3.8981718325193755e-17],[-3.8981718325193755e-17,3.8981718325193755e-17]]
```
