# lower

Convert every string entry to lowercase.

## API

```ts
Numeric.string.lower(text)
```

Lowercases every string entry.

- Parameters:
  - `text`: String or array of strings to convert
- Returns: Lowercase strings matching the input shape
- NumPy: Covers `np.strings.lower`, `np.char.lower` through a single Numerix method.

## Examples

### Lowercase a single string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.lower('HeLLo')

console.log(value)
// hello
```

### Lowercase an array of strings

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.string.lower(['A', 'B'])

console.log(values)
// ["a","b"]
```

### Lowercase an already lowercase string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.lower('abc')

console.log(value)
// abc
```

### Lowercase an empty string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.lower('')

console.log(value)
//
```
