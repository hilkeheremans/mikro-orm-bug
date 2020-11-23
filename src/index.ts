import { AnyEntity, EntityRepository, MikroORM, Reference } from '@mikro-orm/core'
import { SqliteDriver } from '@mikro-orm/sqlite'
import { v4 } from 'uuid'
import Test1 from './entities/test1.entity'
import Test2 from './entities/test2.entity'
import Test3 from './entities/test3.entity'
import Test4 from './entities/test4.entity'
import config from './mikro-orm.config'

let orm: MikroORM<SqliteDriver>
let test1Repo: EntityRepository<Test1>
let test2Repo: EntityRepository<Test2>
let test3Repo: EntityRepository<Test3>
let test4Repo: EntityRepository<Test4>

async function init() {
   orm = await MikroORM.init(config) as MikroORM<SqliteDriver>
   test1Repo = orm.em.getRepository(Test1)
   test2Repo = orm.em.getRepository(Test2)
    test3Repo = orm.em.getRepository(Test3)
  test4Repo = orm.em.getRepository(Test4)
}

async function createEntities() {
  const test1s = Array.from({ length: 5 }, () => new Test1(v4()))
  const test2s = Array.from({ length: 5 }, () => new Test2(v4()))
  const test3s = Array.from({ length: 5 }, () => new Test3(v4()))
  const test4s = Array.from({ length: 5 }, (_, index) => new Test4(v4(), Reference.create(test1s[index])))

  return {test1s, test2s, test3s, test4s}
}

;(async () => {
  await init()
  const {test1s, test2s, test3s, test4s} = await createEntities()
  test2s[0].test1 = Reference.create(test1s[1])
  test2s[4].test1 = Reference.create(test1s[1])

  await test1Repo!.persistAndFlush(test1s)
  await test2Repo!.persistAndFlush(test2s)
  await test3Repo!.persistAndFlush(test3s)
  await test4Repo!.persistAndFlush(test4s)

  await orm!.em.clear()

  console.log('Test1 Entity - optional ManyToOne to self (parent)')
  const test1 = await test1Repo!.findOneOrFail({ id: test1s[0].id })
  await test1Repo!.flush()
  await orm!.em.clear()

  // const test2 = await test2Repo!.findOneOrFail({ id: test2s[0].id }, ['test1'])
  console.log('Test2 Entity - optional ManyToOne to self (parent) and test1')
  const test2 = await test2Repo!.findOneOrFail({ id: test2s[0].id })
  await test2Repo!.flush()
  await orm!.em.clear()

  console.log('Test2 Entity - optional ManyToOne to self (parent) and test1 -- with populate for test1')
  const test2b = await test2Repo!.findOneOrFail({ id: test2s[0].id }, ['test1'])
  await test2Repo!.flush()
  await orm!.em.clear()

  console.log('Test3 Entity - optional ManyToOne to test1')
  const test3 = await test3Repo!.findOneOrFail({ id: test3s[0].id })
  await test3Repo!.flush()

  await orm!.em.clear()

  console.log('Test3 Entity - mandatory ManyToOne to test1')
  const test4 = await test4Repo!.findOneOrFail({ id: test4s[0].id })
  await test4Repo!.flush()
  await orm!.em.clear()

  await orm!.close()

})()
