import {
  BigIntType,
  Collection,
  Entity,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { v4 } from 'uuid'
import { BaseEntity } from './base.entity'
import Test1 from './test1.entity'

@Entity()
export default class Test3  {
  constructor(name: string) {
    this.name = name
  }

  @PrimaryKey({ type: BigIntType })
  id!: string

  @Property()
  name: string

  @ManyToOne(() => Test1, { nullable: true, wrappedReference: true })
  test1?: IdentifiedReference<Test1>
}
