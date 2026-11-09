# greater

Report whether the first string sorts after the second.

## API

```ts
Numeric.string.greater(first, second, inclusive = false)
```

Reports whether the first string sorts after the second.

- Parameters:
  - `first`: First string or array of strings
  - `second`: Second string or array of strings
  - `inclusive`: When true treats equal strings as matching
- Returns: Comparison results matching the input shape
- NumPy: Covers `np.strings.greater`, `np.strings.greater_equal`, `np.char.greater`, `np.char.greater_equal` through a single Numerix method.

## Examples

### Compare two strings

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.greater('b', 'a')

console.log(flag)
// true
```

### Compare reversed strings

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.greater('a', 'b')

console.log(flag)
// false
```

### Include equal strings in the match

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.greater('a', 'a', true)

console.log(flag)
// true
```

### Compare arrays of strings

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.string.greater(['a', 'b'], ['b', 'a'])

console.log(flags)
// [false,true]
```
