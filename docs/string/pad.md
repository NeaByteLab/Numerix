# pad

Expand tab characters to fixed column stops.

## API

```ts
Numeric.string.pad(text, width = 8)
```

Replaces tab stops with spaces up to the width.

- Parameters:
  - `text`: String or array of strings to expand
  - `width`: Column width of each tab stop
- Returns: Expanded strings matching the input shape
- NumPy: Covers `np.strings.expandtabs`, `np.char.expandtabs` through a single Numerix method.

## Examples

### Expand a tab stop

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.pad('a\tb', 8)

console.log(value)
// a       b
```

### Expand with a narrower tab stop

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.pad('a\tb', 4)

console.log(value)
// a   b
```

### Expand a string without tabs

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.pad('ab', 8)

console.log(value)
// ab
```

### Expand an array of strings

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.string.pad(['a\tb', 'c\td'], 4)

console.log(values)
// ["a   b","c   d"]
```
