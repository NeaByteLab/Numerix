# split

Split a string on a separator.

## API

```ts
Numeric.string.split(input, divider, reverse, method, limit)
```

Splits each string on a separator or line break.

- Parameters:
  - `input`: String or array of strings to split
  - `divider`: Divider used when splitting on delimiters
  - `reverse`: When true splits at the last separator
  - `method`: Splitting method applied to each string
  - `limit`: Maximum number of parts to produce
- Returns: Array of parts for each input string
- NumPy: Covers `np.char.split`, `np.char.rsplit`, `np.char.splitlines` through a single Numerix method.

## Examples

### Split on a separator

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.string.split('a,b,c', ',')

console.log(parts)
// [["a","b","c"]]
```

### Split on the default separator

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.string.split('a b c')

console.log(parts)
// [["a","b","c"]]
```

### Split with a limit

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.string.split('a,b,c', ',', false, 'sep', 1)

console.log(parts)
// [["a","b,c"]]
```

### Split at the last separator

The reverse mode keeps the trailing parts separate when a limit is set.

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.string.split('a,b,c', ',', true, 'sep', 1)

console.log(parts)
// [["a,b","c"]]
```

### Split an array of strings

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.string.split(['a,b', 'c,d'], ',')

console.log(parts)
// [["a","b"],["c","d"]]
```
