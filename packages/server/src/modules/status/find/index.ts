import { Status, type StatusBare } from '@server/entities/Status'
import { publicProcedure } from '@server/trpc'

export default publicProcedure.query(async ({ ctx: { db } }) => {
  const workflows = (await db.getRepository(Status).find({
    order: { id: 'ASC' },
  })) as StatusBare[]

  return workflows
})
