import matmul from '@app/linalg/matmul.ts'

/**
 * Evaluate an Einstein summation expression.
 * @description Contracts array axes following a subscript formula.
 * @param subscripts - Index formula describing the contraction
 * @param left - First operand of the contraction
 * @param right - Second operand of the contraction
 * @returns Contracted values matching the requested output axes
 */
export default function einsum(
  subscripts: string,
  left: number[][],
  right?: number[][]
): number | number[] | number[][] {
  const formula = subscripts.replace(/\s+/g, '')
  const rows = left.length
  const columns = left[0]?.length ?? 0
  if (formula === 'ii->' || formula === 'ii') {
    let sum = 0
    for (let index = 0; index < rows; index++) {
      sum += left[index]?.[index] ?? 0
    }
    return sum
  }
  if (formula === 'ii->i') {
    const diagonal = new Array<number>(rows)
    for (let index = 0; index < rows; index++) {
      diagonal[index] = left[index]?.[index] ?? 0
    }
    return diagonal
  }
  if (formula === 'ij->ji') {
    const transposed = new Array<number[]>(columns)
    for (let column = 0; column < columns; column++) {
      const output = new Array<number>(rows)
      for (let row = 0; row < rows; row++) {
        output[row] = left[row]?.[column] ?? 0
      }
      transposed[column] = output
    }
    return transposed
  }
  if (formula === 'ij->i') {
    const sums = new Array<number>(rows)
    for (let row = 0; row < rows; row++) {
      const current = left[row] ?? []
      let sum = 0
      for (let column = 0; column < current.length; column++) {
        sum += current[column] ?? 0
      }
      sums[row] = sum
    }
    return sums
  }
  if (formula === 'ij->j') {
    const sums = new Array<number>(columns).fill(0)
    for (let row = 0; row < rows; row++) {
      const current = left[row] ?? []
      for (let column = 0; column < columns; column++) {
        sums[column] = (sums[column] ?? 0) + (current[column] ?? 0)
      }
    }
    return sums
  }
  if (formula === 'ij->' || formula === 'ij') {
    let sum = 0
    for (let row = 0; row < rows; row++) {
      const current = left[row] ?? []
      for (let column = 0; column < current.length; column++) {
        sum += current[column] ?? 0
      }
    }
    return sum
  }
  if (right && (formula === 'ij,jk->ik' || formula === 'ij,jk')) {
    return matmul(left, right)
  }
  if (right && formula === 'ij,kj->ik') {
    const count = right.length
    const product = new Array<number[]>(rows)
    for (let row = 0; row < rows; row++) {
      const source = left[row] ?? []
      const output = new Array<number>(count)
      for (let column = 0; column < count; column++) {
        const line = right[column] ?? []
        let sum = 0
        for (let index = 0; index < source.length; index++) {
          sum += (source[index] ?? 0) * (line[index] ?? 0)
        }
        output[column] = sum
      }
      product[row] = output
    }
    return product
  }
  if (right && formula === 'ij,ij->ij') {
    const elementwise = new Array<number[]>(rows)
    for (let row = 0; row < rows; row++) {
      const source = left[row] ?? []
      const line = right[row] ?? []
      const output = new Array<number>(source.length)
      for (let column = 0; column < source.length; column++) {
        output[column] = (source[column] ?? 0) * (line[column] ?? 0)
      }
      elementwise[row] = output
    }
    return elementwise
  }
  if (right && (formula === 'ij,ij->' || formula === 'ij,ij')) {
    let sum = 0
    for (let row = 0; row < rows; row++) {
      const current = left[row] ?? []
      const line = right[row] ?? []
      for (let column = 0; column < current.length; column++) {
        sum += (current[column] ?? 0) * (line[column] ?? 0)
      }
    }
    return sum
  }
  return left
}
