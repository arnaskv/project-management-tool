import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { DataSource, type DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as entities from '../entities'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function createDatabase(options: Partial<DataSourceOptions> = {}) {
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
