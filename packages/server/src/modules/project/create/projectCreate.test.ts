import { TestDatabase } from '@tests/utils/database'
import { inferProcedureInput } from '@trpc/server'
import { AppRouter, appRouter } from '@server/modules'
import { createCallerFactory } from '@server/trpc'
import { requestContext } from '@tests/utils/context'

describe('Creation project', () => {
  it('should create a persisted project', async () => {
    const db = TestDatabase.getDataSource()
    const createCaller = createCallerFactory(appRouter)
    const caller = createCaller(requestContext({ db }))

    const input: inferProcedureInput<AppRouter['project']['create']> = {
      name: 'Test project',
    }

    const projectCreated = await caller.project.create(input)

    expect(projectCreated).toMatchObject({
      id: expect.any(Number),
      name: 'Test project',
    })
  })
})
