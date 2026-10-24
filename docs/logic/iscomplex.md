# iscomplex

Test whether values have a complex representation.

## API

```ts
Numeric.logic.iscomplex(value, objects = false)
```

Checks each element for a complex representation.

- Parameters:
  - `value`: Scalar, vector, or matrix values to inspect
  - `objects`: When true inspects complex objects instead
- Returns: Match results matching the input nesting shape
- NumPy: Covers `np.iscomplex`, `np.iscomplexobj` through a single Numerix method.

## Examples

### Check a vector of real values

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.iscomplex([1, 2])

console.log(flags)
// [false,false]
```

### Check the object type of real values

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.iscomplex([1, 2], true)

console.log(flag)
// false
```

### Check a single real value

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.iscomplex(1)

console.log(flag)
// false
```

### Check a matrix of real values

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.iscomplex([[1, 2]])

console.log(flags)
// [[false,false]]
```
