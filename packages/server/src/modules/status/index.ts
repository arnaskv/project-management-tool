import { router } from '@server/trpc'
import create from './create'
import get from './get'
import find from './find'

export default router({
  create,
  get,
  find,
})
