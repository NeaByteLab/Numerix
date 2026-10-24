# tan

Compute the tangent of every element in nested numeric inputs.

## API

```ts
Numeric.trig.tan(value)
```

Applies the tangent function across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Tangents matching the input nesting shape
- NumPy: Equivalent to `np.tan`.

## Examples

### Tangent of a single value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.tan(0)

console.log(value)
// 0
```

### Tangent of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.tan([0, Math.PI / 4])

console.log(values)
// [0,0.9999999999999999]
```

### Tangent of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.tan([[0, Math.PI], [Math.PI, 0]])

console.log(values)
// [[0,-1.2246467991473532e-16],[-1.2246467991473532e-16,0]]
```

### Tangent of a negative angle

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.tan(-Math.PI / 4)

console.log(value)
// -0.9999999999999999
```
