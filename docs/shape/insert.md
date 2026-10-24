# insert

Insert values into an array at the given index.

## API

```ts
Numeric.shape.insert(input, index, values)
```

Inserts the values at the requested position.

- Parameters:
  - `input`: Array receiving the new values
  - `index`: Position where the values are inserted
  - `values`: Values placed into the array
- Returns: Array holding the inserted values
- NumPy: Covers `np.insert`, `np.append` through a single Numerix method.

## Examples

### Insert a value into a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.insert([1, 3], 1, [2])

console.log(values)
// [1,2,3]
```

### Insert at the beginning

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.insert([2, 3], 0, [1])

console.log(values)
// [1,2,3]
```

### Insert at the end

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.insert([1, 2], 2, [3])

console.log(values)
// [1,2,3]
```

### Insert several values at once

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.insert([1, 4], 1, [2, 3])

console.log(values)
// [1,2,3,4]
```
