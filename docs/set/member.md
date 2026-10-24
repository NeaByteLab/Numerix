# member

Test whether values belong to a set of members.

## API

```ts
Numeric.set.member(element, members, invert = false)
```

Reports whether each value belongs to the set.

- Parameters:
  - `element`: Values tested for membership
  - `members`: Values forming the set
  - `invert`: When true reports non-members instead
- Returns: Membership flags for each tested value
- NumPy: Equivalent to `np.isin`.

## Examples

### Test one value for membership

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.set.member([2], [1, 2, 3])

console.log(flags)
// [true]
```

### Test several values for membership

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.set.member([1, 2, 4], [1, 2, 3])

console.log(flags)
// [true,true,false]
```

### Test for non membership

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.set.member([1, 2, 4], [1, 2, 3], true)

console.log(flags)
// [false,false,true]
```

### Test a value outside the set

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.set.member([9], [1, 2, 3])

console.log(flags)
// [false]
```
