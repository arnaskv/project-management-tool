import { inferProcedureInput } from '@trpc/server'
import { AppRouter } from '@server/modules'
import { getCaller } from '@tests/utils/testUtils'

describe('Status Creation', () => {
  it('should create a persisted status', async () => {
    const caller = getCaller()

    const input: inferProcedureInput<AppRouter['status']['create']> = {
      name: 'Test status',
    }

    const statusCreated = await caller.status.create(input)

    expect(statusCreated).toMatchObject({
      id: expect.any(Number),
      name: 'Test status',
    })
  })
})
