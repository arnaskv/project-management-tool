import { TestDatabase } from '@tests/utils/database'
import { inferProcedureInput } from '@trpc/server'
import { AppRouter, appRouter } from '@server/modules'
import { createCallerFactory } from '@server/trpc'
import { requestContext } from '@tests/utils/context'

beforeAll(async () => {
  await TestDatabase.start()
}, 60000)

afterAll(async () => {
  await TestDatabase.stop()
}, 60000)

describe('Workflow Creation', () => {
  it('should create a persisted workflow', async () => {
    const db = TestDatabase.getDataSource()
    const createCaller = createCallerFactory(appRouter)
    const caller = createCaller(requestContext({ db }))

    const input: inferProcedureInput<AppRouter['workflow']['create']> = {
      name: 'Test workflow',
    }

    const workflowCreated = await caller.workflow.create(input)

    expect(workflowCreated).toMatchObject({
      id: expect.any(Number),
      name: 'Test workflow',
    })
  })
})
