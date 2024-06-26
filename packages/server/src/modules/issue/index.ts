import { router } from '@server/trpc'
import create from './create'
import getByProjectId from './getByProjectId'
import find from './find'
import get from './get'

export default router({
  create,
  find,
  get,
  getByProjectId,
})
