# swapcase

Invert the case of every letter in a string.

## API

```ts
Numeric.string.swapcase(text)
```

Inverts uppercase and lowercase letters.

- Parameters:
  - `text`: String or array of strings to convert
- Returns: Case-swapped strings matching the input shape
- NumPy: Covers `np.strings.swapcase`, `np.char.swapcase` through a single Numerix method.

## Examples

### Swap the case of a string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.swapcase('HeLLo')

console.log(value)
// hEllO
```

### Swap the case of an array

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.string.swapcase(['Ab', 'Cd'])

console.log(values)
// ["aB","cD"]
```

### Swap the case of a lowercase string

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.swapcase('abc')

console.log(value)
// ABC
```

### Swap the case of digits

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.swapcase('123')

console.log(value)
// 123
```
