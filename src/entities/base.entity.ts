import { BigIntType, PrimaryKey } from '@mikro-orm/core'

export abstract class BaseEntity {
  @PrimaryKey({ type: BigIntType })
  id!: string
}
