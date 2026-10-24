# heaviside

Evaluate the Heaviside step function for every element.

## API

```ts
Numeric.math.heaviside(value, half = 0.5)
```

Applies the Heaviside step across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
  - `half`: Value returned at the zero crossing
- Returns: Step values matching the input nesting shape
- NumPy: Equivalent to `np.heaviside`.

## Examples

### Heaviside value at zero

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.heaviside(0)

console.log(value)
// 0.5
```

### Heaviside values of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.heaviside([-1, 0, 1])

console.log(values)
// [0,0.5,1]
```

### Custom value at the zero crossing

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.heaviside(0, 1)

console.log(value)
// 1
```

### Heaviside values of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.heaviside([[-1, 0], [1, 2]])

console.log(values)
// [[0,0.5],[1,1]]
```
