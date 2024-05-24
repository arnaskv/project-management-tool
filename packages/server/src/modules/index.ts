import { router } from '../trpc'
import user from './user'
import project from './project'
import workflow from './workflow'
import issue from './issue'
import status from './status'

export const appRouter = router({
  user,
  project,
  workflow,
  issue,
  status,
})

export type AppRouter = typeof appRouter
