# count

Count the occurrences of a substring.

## API

```ts
Numeric.string.count(text, needle)
```

Counts non-overlapping matches inside each string.

- Parameters:
  - `text`: String or array of strings to search
  - `needle`: Substring whose occurrences are counted
- Returns: Match counts matching the input shape
- NumPy: Covers `np.strings.count`, `np.char.count` through a single Numerix method.

## Examples

### Count occurrences in a string

```ts
import Numeric from '@neabyte/numerix'

const count = Numeric.string.count('hello', 'l')

console.log(count)
// 2
```

### Count a missing substring

```ts
import Numeric from '@neabyte/numerix'

const count = Numeric.string.count('hello', 'z')

console.log(count)
// 0
```

### Count occurrences in an array

```ts
import Numeric from '@neabyte/numerix'

const counts = Numeric.string.count(['hello', 'lll'], 'l')

console.log(counts)
// [2,3]
```

### Count a repeated substring

```ts
import Numeric from '@neabyte/numerix'

const count = Numeric.string.count('aaaa', 'aa')

console.log(count)
// 2
```
