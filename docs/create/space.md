# space

Generate linear, logarithmic, or geometric spaced values.

## API

```ts
Numeric.create.space(start, stop, count = 50, mode = 'linear', endpoint = true, base = 10)
```

Generates linear, logarithmic, or geometric spacing.

- Parameters:
  - `start`: First value of the sequence
  - `stop`: Last value of the sequence
  - `count`: Number of values to generate
  - `mode`: Spacing mode applied to the sequence
  - `endpoint`: When true includes the stop value
  - `base`: Logarithm base for logarithmic spacing
- Returns: Array of generated values
- NumPy: Covers `np.linspace`, `np.logspace`, `np.geomspace` through a single Numerix method.

## Examples

### Evenly spaced values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.space(0, 1, 5)

console.log(values)
// [0,0.25,0.5,0.75,1]
```

### Logarithmically spaced values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.space(0, 2, 3, 'log')

console.log(values)
// [1,10,100]
```

### Geometrically spaced values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.space(1, 100, 3, 'geom')

console.log(values)
// [1,10,100]
```

### Spacing that excludes the endpoint

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.space(0, 1, 5, 'linear', false)

console.log(values)
// [0,0.2,0.4,0.6000000000000001,0.8]
```
