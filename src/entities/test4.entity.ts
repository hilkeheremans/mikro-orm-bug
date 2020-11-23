import {
  Collection,
  Entity,
  IdentifiedReference,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Reference,
} from '@mikro-orm/core'
import { v4 } from 'uuid'
import Test1 from './test1.entity'

@Entity()
export default class Test4 {
  constructor(name: string, test1: Reference<Test1>) {
    this.name = name
    this.test1 = test1
  }

  @PrimaryKey()
  id = v4()

  @Property()
  name: string

  @ManyToOne(() => Test1, { wrappedReference: true })
  test1: IdentifiedReference<Test1>
}
