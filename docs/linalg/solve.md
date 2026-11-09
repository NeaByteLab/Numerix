# solve

Solve a linear system of equations.

## API

```ts
Numeric.linalg.solve(factors, constants, square)
```

Computes the solution for the coefficient matrix.

- Parameters:
  - `factors`: Matrix of system coefficients
  - `constants`: Right hand side vector of the system
  - `square`: Whether the coefficient matrix is square
- Returns: Solution vector for the given system
- NumPy: Covers `np.linalg.solve`, `np.linalg.lstsq`, `np.linalg.tensorsolve` through a single Numerix method.

## Examples

### Solve a two equation system

```ts
import Numeric from '@neabyte/numerix'

const solution = Numeric.linalg.solve([[1, 2], [3, 4]], [1, 2])

console.log(solution)
// [0,0.5]
```

### Solve with a square coefficient matrix

```ts
import Numeric from '@neabyte/numerix'

const solution = Numeric.linalg.solve([[1, 2], [3, 4]], [1, 2], true)

console.log(solution)
// [0,0.5]
```

### Solve a single equation

```ts
import Numeric from '@neabyte/numerix'

const solution = Numeric.linalg.solve([[2]], [4])

console.log(solution)
// [2]
```

### Solve an overdetermined system

```ts
import Numeric from '@neabyte/numerix'

const solution = Numeric.linalg.solve([[1, 0], [0, 1], [1, 1]], [1, 2, 3])

console.log(solution)
// [1.0000000000000004,2.000000000000001]
```
