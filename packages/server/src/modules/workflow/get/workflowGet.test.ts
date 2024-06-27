import { getCaller } from '@tests/utils/testUtils'

describe('Get workflow', () => {
  it('should get a workflow by id', async () => {
    const caller = getCaller()

    const newTestWorklow = await caller.workflow.create({ name: 'Test test' })

    const workflow = await caller.workflow.get(newTestWorklow.id)

    expect(workflow).toMatchObject(newTestWorklow)
  })
})
