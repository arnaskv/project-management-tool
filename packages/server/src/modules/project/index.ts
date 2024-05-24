import { router } from '@server/trpc'
import create from './create'
import find from './find'
import get from './get'
import getAllByUser from './getAllByUser'

export default router({
  create,
  find,
  get,
  getAllByUser,
})