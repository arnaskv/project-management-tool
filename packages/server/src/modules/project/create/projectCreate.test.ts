import { inferProcedureInput } from '@trpc/server'
import { AppRouter, appRouter } from '@server/modules'
import { TestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import { fakeUser } from '@server/entities/tests/fakes'
import { authContext } from '@tests/utils/context'
import { createCallerFactory } from '@server/trpc'

describe('Creation project', () => {
  it('should create a persisted project', async () => {
    const db = TestDatabase.getDataSource()
    const user = await db.getRepository(User).save(fakeUser())
    const createCaller = createCallerFactory(appRouter)
    const caller = createCaller(authContext({ db }, user))

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
