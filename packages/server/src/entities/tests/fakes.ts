import type { User } from '@server/entities/User'
import type { Project } from '@server/entities/Project'
import type { Issue } from '@server/entities/Issue'
import type { Workflow } from '@server/entities/Workflow'
import { random } from '@tests/utils/random'

const randomId = () => random.integer({ min: 1, max: 2147483647 })

/**
 * Generates a fake user with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeUser = <T extends Partial<User>>(overrides: T = {} as T) => ({
  id: randomId(),
  email: random.email(),
  password: 'passwOrd012',
  ...overrides,
})

/**
 * Generates a fake project with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeProject = <T extends Partial<Project>>(
  overrides: T = {} as T
) => ({
  id: randomId(),
  name: random.string(),
  ...overrides,
})

/**
 * Generates a fake issue with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeIssue = <T extends Partial<Issue>>(
  overrides: T = {} as T
) => ({
  id: randomId(),
  title: 'new minor issue',
  description: 'add user name and last name inputs in signup form',
  ...overrides,
})

/**
 * Generates a fake workflow with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeWorkflow = <T extends Partial<Workflow>>(
  overrides: T = {} as T
) => ({
  id: randomId(),
  name: random.string(),
  ...overrides,
})
