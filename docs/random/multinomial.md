# multinomial

Draw counts across several outcome categories.

## API

```ts
Numeric.random.multinomial(trials, probabilities, generator)
```

Produces counts across several outcome categories.

- Parameters:
  - `trials`: Number of independent trials to distribute
  - `probabilities`: Outcome probability for each category
  - `generator`: Generator supplying uniform samples
- Returns: Count of outcomes in each category
- NumPy: Equivalent to `Generator.multinomial`.

## Examples

### Distribute ten trials

```ts
import Numeric from '@neabyte/numerix'

const counts = Numeric.random.multinomial(10, [0.5, 0.5], Numeric.random.seed(42))

console.log(counts)
// [4,6]
```

### Distribute across three categories

```ts
import Numeric from '@neabyte/numerix'

const counts = Numeric.random.multinomial(10, [0.2, 0.3, 0.5], Numeric.random.seed(42))

console.log(counts)
// [2,2,6]
```

### Distribute no trials

```ts
import Numeric from '@neabyte/numerix'

const counts = Numeric.random.multinomial(0, [0.5, 0.5], Numeric.random.seed(42))

console.log(counts)
// [0,0]
```

### Distribute without a generator

```ts
import Numeric from '@neabyte/numerix'

const counts = Numeric.random.multinomial(10, [0.5, 0.5])

console.log(counts.length)
// 2
```
