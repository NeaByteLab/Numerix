# sin

Compute the sine of every element in nested numeric inputs.

## API

```ts
Numeric.trig.sin(value)
```

Applies the sine function across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Sines matching the input nesting shape
- NumPy: Equivalent to `np.sin`.

## Examples

### Sine of a single value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.sin(0)

console.log(value)
// 0
```

### Sine of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.sin([0, Math.PI / 2])

console.log(values)
// [0,1]
```

### Sine of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.sin([[0, Math.PI], [Math.PI, 0]])

console.log(values)
// [[0,1.2246467991473532e-16],[1.2246467991473532e-16,0]]
```

### Sine of a negative value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.sin(-Math.PI / 2)

console.log(value)
// -1
```
