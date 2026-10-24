# cos

Compute the cosine of every element in nested numeric inputs.

## API

```ts
Numeric.trig.cos(value)
```

Applies the cosine function across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Cosines matching the input nesting shape
- NumPy: Equivalent to `np.cos`.

## Examples

### Cosine of a single value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.cos(0)

console.log(value)
// 1
```

### Cosine of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.cos([0, Math.PI])

console.log(values)
// [1,-1]
```

### Cosine of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.cos([[0, Math.PI], [Math.PI, 0]])

console.log(values)
// [[1,-1],[-1,1]]
```

### Cosine of a quarter turn

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.cos(Math.PI / 2)

console.log(value)
// 6.123233995736766e-17
```
