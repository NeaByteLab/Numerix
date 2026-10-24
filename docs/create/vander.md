# vander

Build a Vandermonde matrix from a vector of samples.

## API

```ts
Numeric.create.vander(samples, degree = samples.length, increasing = false)
```

Builds a Vandermonde matrix from the samples.

- Parameters:
  - `samples`: Sample values used as the matrix rows
  - `degree`: Highest power generated for each row
  - `increasing`: When true orders powers from low to high
- Returns: Vandermonde matrix
- NumPy: Equivalent to `np.vander`.

## Examples

### Vandermonde matrix from samples

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.vander([1, 2, 3], 2)

console.log(matrix)
// [[1,1],[2,1],[3,1]]
```

### Vandermonde matrix with ascending powers

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.vander([1, 2, 3], 2, true)

console.log(matrix)
// [[1,1],[1,2],[1,3]]
```

### Cubic Vandermonde matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.vander([1, 2], 3)

console.log(matrix)
// [[1,1,1],[4,2,1]]
```

### Vandermonde matrix from one sample

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.create.vander([2], 2)

console.log(matrix)
// [[2,1]]
```
