import { TestDatabase } from '@tests/utils/database'
import { appRouter } from '@server/modules'
import { createCallerFactory } from '@server/trpc'
import { requestContext } from '@tests/utils/context'

describe('Status find', () => {
  it('should find all existing statuses', async () => {
    const db = TestDatabase.getDataSource()
    const createCaller = createCallerFactory(appRouter)
    const caller = createCaller(requestContext({ db }))

    const statuses = await caller.status.find()

    expect(statuses).toBeTruthy()

    statuses.forEach((status) => {
      expect(status).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
      })
    })
  })
})
