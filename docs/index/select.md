# select

Choose between alternative values using the given conditions.

## API

```ts
Numeric.index.select(conditions, choices, fallback = 0, policy = 'select')
```

Chooses between alternatives using the given conditions.

- Parameters:
  - `conditions`: Conditions deciding which choice is taken
  - `choices`: Alternative values available to select
  - `fallback`: Value used when no choice applies
  - `policy`: Selection mode applied to the conditions
  - `level`: Optional axis for two-dimensional compress mode
- Returns: Selected values for each condition
- NumPy: Covers `np.select`, `np.piecewise`, `np.choose`, `np.compress`, `np.extract`, `ndarray.choose`, `ndarray.compress` through a single Numerix method.

## Examples

### Select values where a condition holds

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.index.select([true, false, true], [1, 2, 3])

console.log(values)
// [1,0,3]
```

### Compress values with a boolean mask

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.index.select([true, false, true], [1, 2, 3], 0, 'compress')

console.log(values)
// [1,3]
```

### Choose by index positions

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.index.select([0, 1], [10, 20], 0, 'choose')

console.log(values)
// [10,20]
```

### Select values across matrix conditions

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.index.select([[true, false], [false, true]], [1, 2])

console.log(values)
// [1,2]
```
