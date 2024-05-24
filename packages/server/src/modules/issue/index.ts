import { router } from '@server/trpc'
import create from './create'
import getAllByProjectId from './getAllByProjectId'
import find from './find'

export default router({
  create,
  find,
  getAllByProjectId,
})
