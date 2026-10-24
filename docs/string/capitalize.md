# capitalize

Capitalize the first character of a string.

## API

```ts
Numeric.string.capitalize(text, title = false)
```

Uppercases the first character and lowers the remainder.

- Parameters:
  - `text`: String or array of strings to capitalize
  - `title`: When true capitalizes each word separately
- Returns: Capitalized strings matching the input shape
- NumPy: Covers `np.strings.capitalize`, `np.strings.title`, `np.char.capitalize`, `np.char.title` through a single Numerix method.

## Examples

### Capitalize a single word

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.capitalize('hello world')

console.log(value)
// Hello world
```

### Capitalize every word

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.capitalize('hello world', true)

console.log(value)
// Hello World
```

### Capitalize an array of strings

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.string.capitalize(['a', 'b'])

console.log(values)
// ["A","B"]
```

### Capitalize an empty string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.capitalize('')

console.log(value)
//
```
