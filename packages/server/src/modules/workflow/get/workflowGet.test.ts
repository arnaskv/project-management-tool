import { TestDatabase } from '@tests/utils/database'
import { appRouter } from '@server/modules'
import { createCallerFactory } from '@server/trpc'
import { requestContext } from '@tests/utils/context'

describe('Get workflow', () => {
  it('should get a workflow by id', async () => {
    const db = TestDatabase.getDataSource()
    const createCaller = createCallerFactory(appRouter)
    const caller = createCaller(requestContext({ db }))

    const newTestWorklow = await caller.workflow.create({ name: 'Test test' })

    const workflow = await caller.workflow.get(newTestWorklow.id)

    expect(workflow).toMatchObject(newTestWorklow)
  })
})
