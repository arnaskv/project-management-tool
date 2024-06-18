import { TestDatabase } from '@tests/utils/database'
import { appRouter } from '@server/modules'
import { createCallerFactory } from '@server/trpc'
import { requestContext } from '@tests/utils/context'

describe('Get project', () => {
  it('should get a project by id', async () => {
    const db = TestDatabase.getDataSource()
    const createCaller = createCallerFactory(appRouter)
    const caller = createCaller(requestContext({ db }))

    const newTestProject = await caller.workflow.create({ name: 'Test test' })

    const project = await caller.workflow.get(newTestProject.id)

    expect(project).toMatchObject(newTestProject)
  })
})
