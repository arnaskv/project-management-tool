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

describe('Get workflow', () => {
  it('should get a workflow by id', async () => {
    const db = TestDatabase.getDataSource()
    const createCaller = createCallerFactory(appRouter)
    const caller = createCaller(requestContext({ db }))

    const input: inferProcedureInput<AppRouter['workflow']['get']> = 1

    const workflow = await caller.workflow.get(input)

    expect(workflow).toMatchObject({
      id: 1,
      name: 'Default',
    })
  })
})
