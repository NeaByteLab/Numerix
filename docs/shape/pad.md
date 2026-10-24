# pad

Add entries around an array using the chosen padding mode.

## API

```ts
Numeric.shape.pad(input, width, mode = 'constant', fill = 0)
```

Adds entries around the array using the chosen mode.

- Parameters:
  - `input`: Array to pad
  - `width`: Number of entries added on each side
  - `mode`: Padding mode applied to the array
  - `fill`: Constant value used by constant padding
- Returns: Padded array with the added entries
- NumPy: Equivalent to `np.pad`.

## Examples

### Pad both sides with zeros

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.pad([1, 2], 1)

console.log(values)
// [0,1,2,0]
```

### Pad with different side widths

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.pad([1, 2], [1, 2])

console.log(values)
// [0,1,2,0,0]
```

### Pad by repeating the edge values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.pad([1, 2], 1, 'edge')

console.log(values)
// [1,1,2,2]
```

### Pad with a custom fill value

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.pad([1, 2], 1, 'constant', 9)

console.log(values)
// [9,1,2,9]
```
