import { Collection, Entity, IdentifiedReference, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'
import Test2 from './test2.entity'

@Entity()
export default class Test1 {

  constructor(name: string) {
    this.name = name
  }

  @PrimaryKey()
  id = v4()

  @Property()
  name: string

  @ManyToOne(() => Test1, { nullable: true, wrappedReference: true })
  parent?: IdentifiedReference<Test1>

  @OneToMany(() => Test1, (event) => event.parent)
  children: Collection<Test1> = new Collection<Test1>(this)

}
