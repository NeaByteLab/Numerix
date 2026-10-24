# partition

Split a string around a separator.

## API

```ts
Numeric.string.partition(text, separator, reverse = false)
```

Reports the text before and after the separator.

- Parameters:
  - `text`: String or array of strings to partition
  - `separator`: Separator marking the split position
  - `reverse`: When true splits at the last separator
- Returns: Partitioned parts matching the input shape
- NumPy: Covers `np.strings.partition`, `np.strings.rpartition`, `np.char.partition`, `np.char.rpartition` through a single Numerix method.

## Examples

### Partition around a separator

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.string.partition('a-b', '-')

console.log(parts)
// ["a","-","b"]
```

### Partition a string without a separator

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.string.partition('abc', '-')

console.log(parts)
// ["abc","",""]
```

### Partition at the last separator

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.string.partition('a-b-c', '-', true)

console.log(parts)
// ["a-b","-","c"]
```

### Partition an array of strings

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.string.partition(['a-b', 'c-d'], '-')

console.log(parts)
// [["a","-","b"],["c","-","d"]]
```
