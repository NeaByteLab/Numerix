# equal

Compare two strings with the requested operator.

## API

```ts
Numeric.string.equal(left, right, mode = 'equal')
```

Compares matching entries using the requested operator.

- Parameters:
  - `left`: First string or array of strings
  - `right`: Second string or array of strings
  - `mode`: Comparison operator applied to each pair
- Returns: Comparison results matching the input shape
- NumPy: Covers `np.strings.equal`, `np.strings.not_equal`, `np.char.equal`, `np.char.not_equal`, `np.char.compare_chararrays` through a single Numerix method.

## Examples

### Compare two identical strings

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.equal('a', 'a')

console.log(flag)
// true
```

### Compare two different strings

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.equal('a', 'b')

console.log(flag)
// false
```

### Compare with the greater operator

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.equal('a', 'b', 'greater')

console.log(flag)
// false
```

### Compare arrays of strings

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.string.equal(['a', 'b'], ['a', 'c'])

console.log(flags)
// [true,false]
```
