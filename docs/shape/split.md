# split

Divide an array into equal or sized sections.

## API

```ts
Numeric.shape.split(input, sections, axis = 0, mode = 'equal')
```

Divides the array into equal or sized sections.

- Parameters:
  - `input`: Array to divide into sections
  - `sections`: Number of sections or their sizes
  - `axis`: Axis along which the array is split
  - `mode`: Splitting mode applied to the array
- Returns: Array of section arrays
- NumPy: Covers `np.split`, `np.array_split`, `np.vsplit`, `np.hsplit`, `np.dsplit` through a single Numerix method.

## Examples

### Split into equal sections

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.shape.split([1, 2, 3, 4], 2)

console.log(parts)
// [[1,2],[3,4]]
```

### Split at explicit section sizes

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.shape.split([1, 2, 3, 4], [2, 3])

console.log(parts)
// [[1,2],[3],[4]]
```

### Split a matrix along its columns

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.shape.split([[1, 2, 3, 4], [5, 6, 7, 8]], 2, 1)

console.log(parts)
// [[[1,2],[5,6]],[[3,4],[7,8]]]
```

### Split a vector into three parts

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.shape.split([1, 2, 3, 4, 5, 6], 3)

console.log(parts)
// [[1,2],[3,4],[5,6]]
```
