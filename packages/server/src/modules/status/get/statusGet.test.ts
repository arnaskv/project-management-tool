import { getCaller } from '@tests/utils/testUtils'

describe('Get status', () => {
  it('should get a status by id', async () => {
    const caller = getCaller()

    const newTestStatus = await caller.workflow.create({ name: 'Test test' })

    const status = await caller.workflow.get(newTestStatus.id)

    expect(status).toMatchObject(newTestStatus)
  })
})
