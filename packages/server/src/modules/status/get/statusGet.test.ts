import { TestDatabase } from '@tests/utils/database'
import { appRouter } from '@server/modules'
import { createCallerFactory } from '@server/trpc'
import { requestContext } from '@tests/utils/context'

describe('Get status', () => {
  it('should get a status by id', async () => {
    const db = TestDatabase.getDataSource()
    const createCaller = createCallerFactory(appRouter)
    const caller = createCaller(requestContext({ db }))

    const newTestStatus = await caller.workflow.create({ name: 'Test test' })

    const status = await caller.workflow.get(newTestStatus.id)

    expect(status).toMatchObject(newTestStatus)
  })
})
