import { getCaller } from '@tests/utils/testUtils'

describe('Get project', () => {
  it('should get a project by id', async () => {
    const caller = getCaller()

    const newTestProject = await caller.workflow.create({ name: 'Test test' })

    const project = await caller.workflow.get(newTestProject.id)

    expect(project).toMatchObject(newTestProject)
  })
})
