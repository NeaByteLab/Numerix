# suffix

Test whether a string ends with a suffix.

## API

```ts
Numeric.string.suffix(text, end)
```

Checks the end of each string entry.

- Parameters:
  - `text`: String or array of strings to test
  - `end`: Suffix expected at the end
- Returns: Match results matching the input shape
- NumPy: Covers `np.strings.endswith`, `np.char.endswith` through a single Numerix method.

## Examples

### Test a matching suffix

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.suffix('hello', 'lo')

console.log(flag)
// true
```

### Test a mismatched suffix

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.suffix('hello', 'he')

console.log(flag)
// false
```

### Test an empty suffix

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.suffix('hello', '')

console.log(flag)
// true
```

### Test suffixes across an array

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.string.suffix(['hello', 'world'], 'lo')

console.log(flags)
// [true,false]
```
