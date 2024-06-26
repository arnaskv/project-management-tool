import { Status, statusInsertSchema } from '@server/entities/Status'
import { publicProcedure } from '@server/trpc'

export default publicProcedure
  .input(statusInsertSchema)

  .mutation(async ({ input: statusData, ctx: { db } }) => {
    const statusCreated = db.getRepository(Status).save(statusData)

    return statusCreated
  })
