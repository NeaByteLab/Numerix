# add

Concatenate two strings together.

## API

```ts
Numeric.string.add(left, right)
```

Joins matching entries of two string inputs.

- Parameters:
  - `left`: First string or array of strings
  - `right`: Second string or array of strings
- Returns: Concatenated strings matching the input shape
- NumPy: Covers `np.strings.add`, `np.char.add` through a single Numerix method.

## Examples

### Concatenate two strings

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.add('a', 'b')

console.log(value)
// ab
```

### Concatenate arrays of strings

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.string.add(['a', 'b'], ['c', 'd'])

console.log(values)
// ["ac","bd"]
```

### Concatenate a string with an empty string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.add('ab', '')

console.log(value)
// ab
```

### Concatenate two empty strings

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.add('', '')

console.log(value)
//
```
