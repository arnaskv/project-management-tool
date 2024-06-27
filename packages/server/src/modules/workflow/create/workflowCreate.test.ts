import { inferProcedureInput } from '@trpc/server'
import { AppRouter } from '@server/modules'
import { getCaller } from '@tests/utils/testUtils'

describe('Workflow Creation', () => {
  it('should create a persisted workflow', async () => {
    const caller = getCaller()

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
