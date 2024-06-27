import { DataSource } from 'typeorm'
import { appRouter } from '@server/modules'
import { createCallerFactory } from '@server/trpc'
import { requestContext } from '@tests/utils/context'
import { TestDatabase } from '@tests/utils/database'

export const getCaller = () => {
  const db: DataSource = TestDatabase.getDataSource()
  const createCaller = createCallerFactory(appRouter)
  return createCaller(requestContext({ db }))
}
