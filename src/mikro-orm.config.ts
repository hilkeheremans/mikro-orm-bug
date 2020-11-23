import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import Test1 from './entities/test1.entity'
import Test2 from './entities/test2.entity'
import Test3 from './entities/test3.entity'
import Test4 from './entities/test4.entity'

const config: Options = {
  type: 'sqlite',
  dbName: 'test.db',
  // as we are using class references here, we don't need to specify `entitiesTs` option
  entities: [Test1, Test2, Test3, Test4],
  highlighter: new SqlHighlighter(),
  debug: true,
};

export default config;
