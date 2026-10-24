# slide

Extract overlapping windows of a fixed length from an array.

## API

```ts
Numeric.index.slide(input, window, step = 1)
```

Collects overlapping windows of the given length.

- Parameters:
  - `input`: Array the windows are taken from
  - `window`: Number of entries in each window
  - `step`: Distance between consecutive windows
- Returns: Array of extracted windows
- NumPy: Covers `np.lib.stride_tricks.sliding_window_view`, `np.lib.stride_tricks.as_strided` through a single Numerix method.

## Examples

### Extract overlapping windows

```ts
import Numeric from '@neabyte/numerix'

const windows = Numeric.index.slide([1, 2, 3, 4], 2)

console.log(windows)
// [[1,2],[2,3],[3,4]]
```

### Extract windows with a larger step

```ts
import Numeric from '@neabyte/numerix'

const windows = Numeric.index.slide([1, 2, 3, 4, 5], 2, 2)

console.log(windows)
// [[1,2],[3,4]]
```

### Extract a single full window

```ts
import Numeric from '@neabyte/numerix'

const windows = Numeric.index.slide([1, 2, 3, 4], 4)

console.log(windows)
// [[1,2,3,4]]
```

### Extract windows of length three

```ts
import Numeric from '@neabyte/numerix'

const windows = Numeric.index.slide([1, 2, 3, 4, 5], 3)

console.log(windows)
// [[1,2,3],[2,3,4],[3,4,5]]
```
