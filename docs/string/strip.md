# strip

Trim whitespace from the ends of a string.

## API

```ts
Numeric.string.strip(text, mode = 'both')
```

Trims characters from one or both ends.

- Parameters:
  - `text`: String or array of strings to trim
  - `mode`: Side or sides that are trimmed
- Returns: Trimmed strings matching the input shape
- NumPy: Covers `np.strings.strip`, `np.strings.lstrip`, `np.strings.rstrip`, `np.char.strip`, `np.char.lstrip`, `np.char.rstrip` through a single Numerix method.

## Examples

### Trim both ends

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.strip('  ab  ')

console.log(value)
// ab
```

### Trim the left end

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.strip('  ab  ', 'left')

console.log(value)
// ab
```

### Trim the right end

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.strip('  ab  ', 'right')

console.log(value)
//   ab
```

### Trim an array of strings

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.string.strip([' a ', ' b '])

console.log(values)
// ["a","b"]
```
