# isinf

Test whether values are infinite numbers.

## API

```ts
Numeric.logic.isinf(value, sign)
```

Checks each element against positive and negative infinity.

- Parameters:
  - `value`: Scalar, vector, or matrix values to inspect
  - `sign`: Restricts the check to one infinity sign
- Returns: Match results matching the input nesting shape
- NumPy: Covers `np.isinf`, `np.isposinf`, `np.isneginf` through a single Numerix method.

## Examples

### Check a vector with infinite values

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.isinf([1, Infinity, -Infinity])

console.log(flags)
// [false,true,true]
```

### Check only positive infinity

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.isinf([1, Infinity, -Infinity], 1)

console.log(flags)
// [false,true,false]
```

### Check only negative infinity

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.isinf([1, Infinity, -Infinity], -1)

console.log(flags)
// [false,false,true]
```

### Check a single finite value

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.isinf(1)

console.log(flag)
// false
```
