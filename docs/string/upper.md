# upper

Convert every string entry to uppercase.

## API

```ts
Numeric.string.upper(text)
```

Uppercases every string entry.

- Parameters:
  - `text`: String or array of strings to convert
- Returns: Uppercase strings matching the input shape
- NumPy: Covers `np.strings.upper`, `np.char.upper` through a single Numerix method.

## Examples

### Uppercase a single string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.upper('HeLLo')

console.log(value)
// HELLO
```

### Uppercase an array of strings

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.string.upper(['a', 'b'])

console.log(values)
// ["A","B"]
```

### Uppercase an already uppercase string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.upper('ABC')

console.log(value)
// ABC
```

### Uppercase an empty string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.upper('')

console.log(value)
//
```
