import { join } from 'path'
import { DataSource, type DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as entities from '@server/entities'

export function createDatabase(options: Partial<DataSourceOptions>) {
  return new DataSource({
    entities,
    migrations: [relative('./migrations/**/*.ts')],
    namingStrategy: new SnakeNamingStrategy(),
    ...options,
  } as any)
}

function relative(...paths: string[]) {
  return join(__dirname, ...paths)
}

export type Database = DataSource
