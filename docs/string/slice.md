# slice

Extract a substring from a string.

## API

```ts
Numeric.string.slice(text, start = 0, stop)
```

Slices each string between the given bounds.

- Parameters:
  - `text`: String or array of strings to slice
  - `start`: Starting index of the extracted portion
  - `stop`: Ending index of the extracted portion
- Returns: Extracted substrings matching the input shape
- NumPy: Covers `np.strings.slice`, `np.char.slice` through a single Numerix method.

## Examples

### Slice a substring

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.slice('hello', 1, 3)

console.log(value)
// el
```

### Slice from the start

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.slice('hello', 0, 2)

console.log(value)
// he
```

### Slice to the end

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.slice('hello', 3)

console.log(value)
// lo
```

### Slice an array of strings

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.string.slice(['hello', 'world'], 0, 2)

console.log(values)
// ["he","wo"]
```
