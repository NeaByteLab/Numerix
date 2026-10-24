# mask

Build row and column coordinate pairs for a matrix pattern.

## API

```ts
Numeric.index.mask(order, mode = 'diag', offset = 0)
```

Generates coordinate pairs for a matrix pattern.

- Parameters:
  - `order`: Number of coordinates in each dimension
  - `mode`: Pattern of the generated coordinates
  - `offset`: Diagonal offset applied to the pattern
- Returns: Row and column coordinate pairs
- NumPy: Covers `np.mask_indices`, `np.diag_indices`, `np.diag_indices_from`, `np.tril_indices`, `np.tril_indices_from`, `np.triu_indices`, `np.triu_indices_from` through a single Numerix method.

## Examples

### Diagonal coordinate pairs

```ts
import Numeric from '@neabyte/numerix'

const pairs = Numeric.index.mask(3, 'diag')

console.log(pairs)
// [[0,1,2],[0,1,2]]
```

### Lower triangle coordinate pairs

```ts
import Numeric from '@neabyte/numerix'

const pairs = Numeric.index.mask(3, 'tril')

console.log(pairs)
// [[0,1,1,2,2,2],[0,0,1,0,1,2]]
```

### Upper triangle coordinate pairs

```ts
import Numeric from '@neabyte/numerix'

const pairs = Numeric.index.mask(3, 'triu')

console.log(pairs)
// [[0,0,0,1,1,2],[0,1,2,1,2,2]]
```

### Diagonal pairs with an offset

```ts
import Numeric from '@neabyte/numerix'

const pairs = Numeric.index.mask(3, 'diag', 1)

console.log(pairs)
// [[0,1,2],[0,1,2]]
```
