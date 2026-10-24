# isreal

Test whether values have a real representation.

## API

```ts
Numeric.logic.isreal(value, objects = false)
```

Checks each element for a real representation.

- Parameters:
  - `value`: Scalar, vector, or matrix values to inspect
  - `objects`: When true inspects complex objects instead
- Returns: Match results matching the input nesting shape
- NumPy: Covers `np.isreal`, `np.isrealobj` through a single Numerix method.

## Examples

### Check a vector of real values

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.isreal([1, 2])

console.log(flags)
// [true,true]
```

### Check the object type of real values

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.isreal([1, 2], true)

console.log(flag)
// true
```

### Check a single real value

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.isreal(1)

console.log(flag)
// true
```

### Check a matrix of real values

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.isreal([[1, 2]])

console.log(flags)
// [[true,true]]
```
