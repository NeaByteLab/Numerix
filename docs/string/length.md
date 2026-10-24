# length

Count the characters in a string.

## API

```ts
Numeric.string.length(text)
```

Counts characters in each string entry.

- Parameters:
  - `text`: String or array of strings to measure
- Returns: Character counts matching the input shape
- NumPy: Covers `np.strings.str_len`, `np.char.str_len` through a single Numerix method.

## Examples

### Count the characters of a string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.length('hello')

console.log(value)
// 5
```

### Count the characters of an array

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.string.length(['a', 'abc'])

console.log(values)
// [1,3]
```

### Count the characters of an empty string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.length('')

console.log(value)
// 0
```

### Count the characters of a spaced string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.length('a b')

console.log(value)
// 3
```
