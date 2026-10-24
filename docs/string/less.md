# less

Report whether the left string sorts before the right.

## API

```ts
Numeric.string.less(left, right, inclusive = false)
```

Reports whether the left string sorts before the right.

- Parameters:
  - `left`: First string or array of strings
  - `right`: Second string or array of strings
  - `inclusive`: When true treats equal strings as matching
- Returns: Comparison results matching the input shape
- NumPy: Covers `np.strings.less`, `np.strings.less_equal`, `np.char.less`, `np.char.less_equal` through a single Numerix method.

## Examples

### Compare two strings

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.less('a', 'b')

console.log(flag)
// true
```

### Compare reversed strings

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.less('b', 'a')

console.log(flag)
// false
```

### Include equal strings in the match

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.less('a', 'a', true)

console.log(flag)
// true
```

### Compare arrays of strings

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.string.less(['a', 'b'], ['b', 'a'])

console.log(flags)
// [true,false]
```
