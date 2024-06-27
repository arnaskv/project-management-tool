import { getCaller } from '@tests/utils/testUtils'

describe('Workflow find', () => {
  it('should find all existing workflows', async () => {
    const caller = getCaller()

    const workflows = await caller.workflow.find()

    expect(workflows).toBeTruthy()

    workflows.forEach((workflow) => {
      expect(workflow).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
      })
    })
  })
})
