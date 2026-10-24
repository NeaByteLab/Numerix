# acosh

Compute the inverse hyperbolic cosine of every element in nested numeric inputs.

## API

```ts
Numeric.trig.acosh(value)
```

Applies the inverse hyperbolic cosine across nested inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Inverse hyperbolic cosines matching the input nesting shape
- NumPy: Covers `np.acosh`, `np.arccosh` through a single Numerix method.

## Examples

### Inverse hyperbolic cosine of one

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.acosh(1)

console.log(value)
// 0
```

### Inverse hyperbolic cosine of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.acosh([1, 2])

console.log(values)
// [0,1.3169578969248166]
```

### Inverse hyperbolic cosine of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.acosh([[1, 2], [2, 1]])

console.log(values)
// [[0,1.3169578969248166],[1.3169578969248166,0]]
```

### Inverse hyperbolic cosine of a larger value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.acosh(10)

console.log(value)
// 2.993222846126381
```
