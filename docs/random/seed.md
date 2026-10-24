# seed

Create a deterministic generator from an integer seed.

## API

```ts
Numeric.random.seed(value = Date.now())
```

Builds a deterministic generator from an integer seed.

- Parameters:
  - `value`: Seed value controlling the generated sequence
- Returns: Generator producing a repeatable sample sequence
- NumPy: Covers `np.random.default_rng`, `Generator.spawn` through a single Numerix method.

## Examples

### Build a seeded generator

```ts
import Numeric from '@neabyte/numerix'

const generator = Numeric.random.seed(42)

console.log(typeof generator)
// object
```

### Reproduce the same sample twice

```ts
import Numeric from '@neabyte/numerix'

const first = Numeric.random.uniform(0, 1, 3, Numeric.random.seed(42))
const second = Numeric.random.uniform(0, 1, 3, Numeric.random.seed(42))

console.log(first)
// [0.002643892541527748,0.660311977379024,0.11095708678476512]
console.log(second)
// [0.002643892541527748,0.660311977379024,0.11095708678476512]
```

### Change the seed for a new sequence

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.uniform(0, 1, 3, Numeric.random.seed(7))

console.log(values)
// [0.00044065131805837154,0.10952103300951421,0.9038964069914073]
```

### Use a generator for one sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.uniform(0, 1, undefined, Numeric.random.seed(42))

console.log(value)
// 0.002643892541527748
```
