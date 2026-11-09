# prefix

Test whether a string starts with a prefix.

## API

```ts
Numeric.string.prefix(input, opener, begin, finish)
```

Checks the beginning of each string entry.

- Parameters:
  - `input`: String or array of strings to test
  - `opener`: Prefix expected at the beginning
  - `begin`: Optional starting offset within each string
  - `finish`: Optional ending offset within each string
- Returns: Match results matching the input shape
- NumPy: Covers `np.strings.startswith`, `np.char.startswith` through a single Numerix method.

## Examples

### Test a matching prefix

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.prefix('hello', 'he')

console.log(flag)
// true
```

### Test a mismatched prefix

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.prefix('hello', 'lo')

console.log(flag)
// false
```

### Test an empty prefix

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.prefix('hello', '')

console.log(flag)
// true
```

### Test prefixes across an array

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.string.prefix(['hello', 'world'], 'he')

console.log(flags)
// [true,false]
```
