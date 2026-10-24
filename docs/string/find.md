# find

Find the position of a substring in a string.

## API

```ts
Numeric.string.find(text, needle, reverse = false)
```

Reports the index of the first or last occurrence.

- Parameters:
  - `text`: String or array of strings to search
  - `needle`: Substring whose position is reported
  - `reverse`: When true searches from the end
- Returns: Match positions matching the input shape
- NumPy: Covers `np.strings.find`, `np.strings.rfind`, `np.strings.index`, `np.strings.rindex`, `np.char.find`, `np.char.rfind`, `np.char.index`, `np.char.rindex` through a single Numerix method.

## Examples

### Find the first occurrence

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.string.find('hello', 'l')

console.log(index)
// 2
```

### Find the last occurrence

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.string.find('hello', 'l', true)

console.log(index)
// 3
```

### Find a missing substring

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.string.find('hello', 'z')

console.log(index)
// -1
```

### Find within an array of strings

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.string.find(['hello', 'world'], 'o')

console.log(indices)
// [4,1]
```
