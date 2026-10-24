# replace

Replace every occurrence of a substring.

## API

```ts
Numeric.string.replace(text, search, replace)
```

Swaps every match of the search string.

- Parameters:
  - `text`: String or array of strings to update
  - `search`: Substring whose occurrences are replaced
  - `replace`: Replacement text inserted for each match
- Returns: Updated strings matching the input shape
- NumPy: Covers `np.strings.replace`, `np.strings.translate`, `np.char.replace`, `np.char.translate` through a single Numerix method.

## Examples

### Replace every occurrence

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.replace('hello', 'l', 'L')

console.log(value)
// heLLo
```

### Replace a missing substring

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.replace('hello', 'z', 'Z')

console.log(value)
// hello
```

### Replace with an empty string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.replace('hello', 'l', '')

console.log(value)
// heo
```

### Replace across an array of strings

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.string.replace(['hello', 'world'], 'o', '0')

console.log(values)
// ["hell0","w0rld"]
```
