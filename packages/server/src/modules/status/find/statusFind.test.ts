import { getCaller } from '@tests/utils/testUtils'

describe('Status find', () => {
  it('should find all existing statuses', async () => {
    const caller = getCaller()

    const statuses = await caller.status.find()

    expect(statuses).toBeTruthy()

    statuses.forEach((status) => {
      expect(status).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
      })
    })
  })
})
