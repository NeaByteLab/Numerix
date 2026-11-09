# roll

Roll array entries forward by a given offset.

## API

```ts
Numeric.shape.roll(input, offset, level)
```

Moves entries from the end to the front.

- Parameters:
  - `input`: Array whose entries are shifted
  - `offset`: Number of positions each entry moves
  - `level`: Optional axis or axes along which entries are shifted
- Returns: Array containing the rolled entries
- NumPy: Equivalent to `np.roll`.

## Examples

### Roll a vector forward

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.roll([1, 2, 3], 1)

console.log(values)
// [3,1,2]
```

### Roll a vector backward

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.roll([1, 2, 3], -1)

console.log(values)
// [2,3,1]
```

### Roll a matrix by one position

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.roll([[1, 2], [3, 4]], 1)

console.log(matrix)
// [[4,1],[2,3]]
```

### Roll by a full cycle

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.roll([1, 2, 3], 3)

console.log(values)
// [1,2,3]
```
