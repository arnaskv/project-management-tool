import { getCaller } from '@tests/utils/testUtils'

describe('Find project', () => {
  it('should find all existing projects', async () => {
    const caller = getCaller()

    const projects = await caller.project.find()

    projects.forEach((project) => {
      expect(project).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
      })
    })
  })
})
