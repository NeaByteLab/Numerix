# join

Insert a separator between every character of a string.

## API

```ts
Numeric.string.join(separator, text)
```

Inserts a separator between every character.

- Parameters:
  - `separator`: Separator placed between characters
  - `text`: String or array of strings to join
- Returns: Joined strings matching the input shape
- NumPy: Equivalent to `np.char.join`.

## Examples

### Join the characters of a string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.join('-', 'abc')

console.log(value)
// a-b-c
```

### Join with an empty separator

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.join('', 'abc')

console.log(value)
// abc
```

### Join an array of strings

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.string.join('-', ['ab', 'cd'])

console.log(values)
// ["a-b","c-d"]
```

### Join a single character

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.join('-', 'a')

console.log(value)
// a
```
