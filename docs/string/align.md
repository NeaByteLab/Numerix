# align

Pad a string to a fixed width.

## API

```ts
Numeric.string.align(text, width, mode = 'center', fill = ' ')
```

Pads text using the requested alignment mode.

- Parameters:
  - `text`: String or array of strings to align
  - `width`: Target width of the aligned text
  - `mode`: Alignment mode applied to each string
  - `fill`: Character used to fill the padding
- Returns: Aligned strings matching the input shape
- NumPy: Covers `np.strings.center`, `np.strings.ljust`, `np.strings.rjust`, `np.strings.zfill`, `np.char.center`, `np.char.ljust`, `np.char.rjust`, `np.char.zfill` through a single Numerix method.

## Examples

### Align to the left

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.align('ab', 6, 'left')

console.log(value)
// ab
```

### Align to the right

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.align('ab', 6, 'right')

console.log(value)
//     ab
```

### Align in the center

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.align('ab', 6, 'center')

console.log(value)
//   ab
```

### Pad a number with leading zeros

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.align('42', 6, 'zero')

console.log(value)
// 000042
```
