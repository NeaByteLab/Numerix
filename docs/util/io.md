# io

Parse delimited matrix text or render a matrix back into text.

## API

```ts
Numeric.util.io(source, delimiter = ',')
```

Parses delimited text or renders a matrix.

- Parameters:
  - `source`: Text to parse or matrix to render
  - `delimiter`: Separator placed between columns
- Returns: Parsed matrix or rendered text
- NumPy: Covers `np.load`, `np.save`, `np.savez`, `np.savez_compressed`, `np.loadtxt`, `np.savetxt`, `np.genfromtxt`, `np.fromregex`, `np.fromfile`, `ndarray.tobytes`, `ndarray.tofile` through a single Numerix method.

## Examples

### Parse comma separated matrix text

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.util.io('1,2,3\n4,5,6')

console.log(matrix)
// [[1,2,3],[4,5,6]]
```

### Parse text using a custom delimiter

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.util.io('1;2;3', ';')

console.log(matrix)
// [[1,2,3]]
```

### Render a matrix as text

```ts
import Numeric from '@neabyte/numerix'

const text = Numeric.util.io([[1, 2], [3, 4]])

console.log(text)
// 1,2
// 3,4
```

### Render a matrix with a custom delimiter

```ts
import Numeric from '@neabyte/numerix'

const text = Numeric.util.io([[1, 2], [3, 4]], ';')

console.log(text)
// 1;2
// 3;4
```
