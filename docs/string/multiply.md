# multiply

Repeat a string a given number of times.

## API

```ts
Numeric.string.multiply(left, count)
```

Concatenates each string with itself repeatedly.

- Parameters:
  - `left`: String or array of strings to repeat
  - `count`: Number of repetitions for each string
- Returns: Repeated strings matching the input shape
- NumPy: Covers `np.strings.multiply`, `np.char.multiply` through a single Numerix method.

## Examples

### Repeat a string twice

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.multiply('ab', 2)

console.log(value)
// abab
```

### Repeat a string three times

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.multiply('ab', 3)

console.log(value)
// ababab
```

### Repeat a string once

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.multiply('ab', 1)

console.log(value)
// ab
```

### Repeat a string zero times

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.multiply('ab', 0)

console.log(value)
//
```
