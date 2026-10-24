# roll

Roll array entries forward by a given offset.

## API

```ts
Numeric.shape.roll(input, shift)
```

Moves entries from the end to the front.

- Parameters:
  - `input`: Array whose entries are shifted
  - `shift`: Number of positions each entry moves
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

### Roll each row of a matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.roll([[1, 2], [3, 4]], 1)

console.log(matrix)
// [[3,4],[1,2]]
```

### Roll by a full cycle

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.roll([1, 2, 3], 3)

console.log(values)
// [1,2,3]
```
