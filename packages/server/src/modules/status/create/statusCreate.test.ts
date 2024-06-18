import { TestDatabase } from '@tests/utils/database'
import { inferProcedureInput } from '@trpc/server'
import { AppRouter, appRouter } from '@server/modules'
import { createCallerFactory } from '@server/trpc'
import { requestContext } from '@tests/utils/context'

describe('Status Creation', () => {
  it('should create a persisted status', async () => {
    const db = TestDatabase.getDataSource()
    const createCaller = createCallerFactory(appRouter)
    const caller = createCaller(requestContext({ db }))

    const input: inferProcedureInput<AppRouter['status']['create']> = {
      name: 'Test status',
    }

    const statusCreated = await caller.status.create(input)

    expect(statusCreated).toMatchObject({
      id: expect.any(Number),
      name: 'Test status',
    })
  })
})
