# tanh

Compute the hyperbolic tangent of every element in nested numeric inputs.

## API

```ts
Numeric.trig.tanh(value)
```

Applies the hyperbolic tangent across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Hyperbolic tangents matching the input nesting shape
- NumPy: Equivalent to `np.tanh`.

## Examples

### Hyperbolic tangent of a single value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.tanh(0)

console.log(value)
// 0
```

### Hyperbolic tangent of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.tanh([0, 1])

console.log(values)
// [0,0.7615941559557649]
```

### Hyperbolic tangent of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.tanh([[0, 1], [1, 0]])

console.log(values)
// [[0,0.7615941559557649],[0.7615941559557649,0]]
```

### Hyperbolic tangent stays below one

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.tanh(10)

console.log(value)
// 0.9999999958776927
```
