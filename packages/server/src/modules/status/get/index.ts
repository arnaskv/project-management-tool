import { Status, statusSchema, type StatusBare } from '@server/entities/Status'
import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'

export default publicProcedure
  .input(statusSchema.shape.id)
  .query(async ({ input: statusId, ctx: { db } }) => {
    const status = (await db.getRepository(Status).findOne({
      where: { id: statusId },
    })) as StatusBare

    if (!status) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Status was not found`,
      })
    }

    return status
  })
