# not

Negate boolean or numeric values.

## API

```ts
Numeric.logic.not(value)
```

Inverts each element of the nested input.

- Parameters:
  - `value`: Scalar, vector, or matrix values to negate
- Returns: Negated values matching the input nesting shape
- NumPy: Equivalent to `np.logical_not`.

## Examples

### Negate a vector of booleans

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.logic.not([true, false])

console.log(values)
// [false,true]
```

### Negate a single boolean

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.logic.not(true)

console.log(value)
// false
```

### Negate numeric truthiness

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.logic.not([1, 0])

console.log(values)
// [false,true]
```

### Negate a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.logic.not([[true, false]])

console.log(values)
// [[false,true]]
```
