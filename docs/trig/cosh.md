# cosh

Compute the hyperbolic cosine of every element in nested numeric inputs.

## API

```ts
Numeric.trig.cosh(value)
```

Applies the hyperbolic cosine across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Hyperbolic cosines matching the input nesting shape
- NumPy: Equivalent to `np.cosh`.

## Examples

### Hyperbolic cosine of a single value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.cosh(0)

console.log(value)
// 1
```

### Hyperbolic cosine of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.cosh([0, 1])

console.log(values)
// [1,1.5430806348152437]
```

### Hyperbolic cosine of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.cosh([[0, 1], [1, 0]])

console.log(values)
// [[1,1.5430806348152437],[1.5430806348152437,1]]
```

### Hyperbolic cosine grows for larger values

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.cosh(2)

console.log(value)
// 3.7621956910836314
```
