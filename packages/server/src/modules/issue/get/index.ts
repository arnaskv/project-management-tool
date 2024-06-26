import { Issue } from '@server/entities'
import { issueSchema } from '@server/entities/Issue'
import { TRPCError } from '@trpc/server'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure
  .input(issueSchema.shape.id)
  .mutation(async ({ input: issueId, ctx: { db } }) => {
    const issue = db.getRepository(Issue).findOne({ where: { id: issueId } })

    if (!issue) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Issue not found.',
      })
    }

    return issue
  })
