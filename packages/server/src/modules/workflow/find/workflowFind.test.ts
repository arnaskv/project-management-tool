import { TestDatabase } from '@tests/utils/database'
import { appRouter } from '@server/modules'
import { createCallerFactory } from '@server/trpc'
import { requestContext } from '@tests/utils/context'

describe('Workflow find', () => {
  it('should find all existing workflows', async () => {
    const db = TestDatabase.getDataSource()
    const createCaller = createCallerFactory(appRouter)
    const caller = createCaller(requestContext({ db }))

    const workflows = await caller.workflow.find()

    expect(workflows).toBeTruthy()

    workflows.forEach((workflow) => {
      expect(workflow).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
      })
    })
  })
})
