import { Workflow, workflowInsertSchema } from '@server/entities/Workflow'
import { publicProcedure } from '@server/trpc'

export default publicProcedure
  .input(workflowInsertSchema)
  .mutation(async ({ input: workflowData, ctx: { db } }) => {
    const workflow = {
      ...workflowData,
    }

    const workflowCreated = await db.getRepository(Workflow).save(workflow)

    return workflowCreated
  })
