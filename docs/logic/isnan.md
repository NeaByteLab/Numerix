# isnan

Test whether values are not numbers.

## API

```ts
Numeric.logic.isnan(value)
```

Checks each element against the not a number value.

- Parameters:
  - `value`: Scalar, vector, or matrix values to inspect
- Returns: Match results matching the input nesting shape
- NumPy: Covers `np.isnan`, `np.isnat` through a single Numerix method.

## Examples

### Check a vector with a not a number value

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.isnan([1, NaN])

console.log(flags)
// [false,true]
```

### Check a single finite value

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.isnan(1)

console.log(flag)
// false
```

### Check a single not a number value

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.isnan(NaN)

console.log(flag)
// true
```

### Check a matrix

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.isnan([[1, NaN]])

console.log(flags)
// [[false,true]]
```
