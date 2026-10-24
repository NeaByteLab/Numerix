# remove

Remove entries from an array at the given indices.

## API

```ts
Numeric.shape.remove(input, indices)
```

Removes the indexed entries from the array.

- Parameters:
  - `input`: Array losing the selected entries
  - `indices`: Positions of the entries to remove
- Returns: Array without the removed entries
- NumPy: Equivalent to `np.delete`.

## Examples

### Remove one entry

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.remove([1, 2, 3], [1])

console.log(values)
// [1,3]
```

### Remove the first entry

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.remove([1, 2, 3], [0])

console.log(values)
// [2,3]
```

### Remove the last entry

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.remove([1, 2, 3], [2])

console.log(values)
// [1,2]
```

### Remove several entries

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.remove([1, 2, 3, 4], [0, 2])

console.log(values)
// [2,4]
```
