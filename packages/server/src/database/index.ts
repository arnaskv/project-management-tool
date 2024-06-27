import { DataSource, type DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as entities from '@server/entities'
import { relative } from '@server/utils/utilities'

export function createDatabase(options: Partial<DataSourceOptions> = {}) {
  return new DataSource({
    entities,
    migrations: [relative('./migrations/**/*.ts')],
    namingStrategy: new SnakeNamingStrategy(),
    ...options,
  } as any)
}

export type Database = DataSource
