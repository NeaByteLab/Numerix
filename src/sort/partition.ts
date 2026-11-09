import type * as Types from '@app/types.ts'
import * as Index from '@app/index/index.ts'
import * as Shape from '@app/shape/index.ts'
import argpartition from '@app/sort/argpartition.ts'

/**
 * Partition a matrix around a rank.
 * @description Places flattened values at the given rank in their sorted positions.
 * @param values - Matrix to partition
 * @param order - Position or positions of the partition boundary
 * @param level - Null axis indicating a flattened partition
 * @returns Partitioned flattened vector matching the rank
 */
export default function partition(
  values: number[][],
  order: number | number[],
  level: null
): number[]
/**
 * Partition a matrix around a rank.
 * @description Places the value at the given rank in its sorted position.
 * @param values - Matrix to partition
 * @param order - Position or positions of the partition boundary
 * @param level - Axis along which to partition a matrix
 * @returns Partitioned matrix matching the rank
 */
export default function partition(
  values: number[][],
  order: number | number[],
  level?: number
): number[][]
/**
 * Partition a vector around a rank.
 * @description Places the value at the given rank in its sorted position.
 * @param values - Vector to partition
 * @param order - Position or positions of the partition boundary
 * @param level - Axis along which to partition a vector
 * @returns Partitioned vector matching the rank
 */
export default function partition(
  values: number[],
  order: number | number[],
  level?: number | null
): number[]
/**
 * Partition a complex vector.
 * @description Places the value at the given rank in its sorted position.
 * @param values - Complex values to partition
 * @param order - Position or positions of the partition boundary
 * @param level - Axis along which to partition
 * @returns Partitioned complex values matching the rank
 */
export default function partition(
  values: Types.NumerixComplex[] | Types.NumerixComplex[][],
  order: number | number[],
  level?: number | null
): Types.NumerixComplex[] | Types.NumerixComplex[][]
/**
 * Partition values around a rank.
 * @description Places the value at the given rank in its sorted position.
 * @param values - Values to partition
 * @param order - Position or positions of the partition boundary
 * @param level - Axis along which to partition a matrix
 * @returns Partitioned values matching the rank
 */
export default function partition(
  values:
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  order: number | number[],
  level: number | null = -1
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (!Array.isArray(values[0])) {
    return Index.take(
      values as number[],
      argpartition(values as (number | Types.NumerixComplex)[], order, level)
    ) as number[] | Types.NumerixComplex[]
  }
  if (level === null) {
    return partition(Shape.flatten(values) as number[], order, 0)
  }
  return Index.take(
    values as number[][],
    argpartition(values as (number | Types.NumerixComplex)[][], order, level),
    level < 0 ? 2 + level : level
  ) as number[][] | Types.NumerixComplex[][]
}
