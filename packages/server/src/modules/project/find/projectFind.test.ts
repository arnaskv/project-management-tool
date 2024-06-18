import { TestDatabase } from '@tests/utils/database'
import { appRouter } from '@server/modules'
import { createCallerFactory } from '@server/trpc'
import { requestContext } from '@tests/utils/context'

describe('Find project', () => {
  it('should find all existing projects', async () => {
    const db = TestDatabase.getDataSource()
    const createCaller = createCallerFactory(appRouter)
    const caller = createCaller(requestContext({ db }))

    const projects = await caller.project.find()

    projects.forEach((project) => {
      expect(project).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
      })
    })
  })
})
