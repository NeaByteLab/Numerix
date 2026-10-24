# sinh

Compute the hyperbolic sine of every element in nested numeric inputs.

## API

```ts
Numeric.trig.sinh(value)
```

Applies the hyperbolic sine across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Hyperbolic sines matching the input nesting shape
- NumPy: Equivalent to `np.sinh`.

## Examples

### Hyperbolic sine of a single value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.sinh(0)

console.log(value)
// 0
```

### Hyperbolic sine of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.sinh([0, 1])

console.log(values)
// [0,1.1752011936438014]
```

### Hyperbolic sine of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.sinh([[0, 1], [1, 0]])

console.log(values)
// [[0,1.1752011936438014],[1.1752011936438014,0]]
```

### Hyperbolic sine of a negative value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.sinh(-1)

console.log(value)
// -1.1752011936438014
```
