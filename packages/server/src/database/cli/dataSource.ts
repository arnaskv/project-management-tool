import config from '@server/config'
import { createDatabase } from '..'

export const migrationDataSource = createDatabase(config.database as any)
