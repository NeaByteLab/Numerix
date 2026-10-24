# where

Report matching positions or pick values where a condition holds.

## API

```ts
Numeric.index.where(condition, yes, no, mode = 'index')
```

Reports positions or picks values where the condition holds.

- Parameters:
  - `condition`: Conditions deciding which values are used
  - `yes`: Value used where the condition holds
  - `no`: Value used where the condition fails
  - `mode`: Reporting mode for the selected positions
- Returns: Selected values or matching positions
- NumPy: Covers `np.where`, `np.nonzero`, `np.flatnonzero`, `np.argwhere`, `ndarray.nonzero` through a single Numerix method.

## Examples

### Find matching positions in a vector

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.index.where([true, false, true])

console.log(indices)
// [[0,2]]
```

### Find matching positions as a flat list

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.index.where([true, false, true], undefined, undefined, 'flat')

console.log(indices)
// [0,2]
```

### Pick values from a condition

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.index.where([true, false], 1, 0)

console.log(values)
// [1,0]
```

### Find matching positions in a matrix

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.index.where([[true, false], [false, true]])

console.log(indices)
// [[0,1],[0,1]]
```
