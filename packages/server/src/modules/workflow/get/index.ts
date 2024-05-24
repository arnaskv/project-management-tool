import {
  Workflow,
  workflowSchema,
  type WorkflowBare,
} from '@server/entities/Workflow'
import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'

export default publicProcedure
  .input(workflowSchema.shape.id)
  .query(async ({ input: workflowId, ctx: { db } }) => {
    const workflow = (await db.getRepository(Workflow).findOne({
      where: { id: workflowId },
    })) as WorkflowBare

    if (!workflow) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Workflow was not found`,
      })
    }

    return workflow
  })
