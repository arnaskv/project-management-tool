import { Workflow, type WorkflowBare } from '@server/entities/Workflow'
import { publicProcedure } from '@server/trpc'

export default publicProcedure.query(async ({ ctx: { db } }) => {
  const workflows = (await db.getRepository(Workflow).find({
    order: { id: 'ASC' },
  })) as WorkflowBare[]

  return workflows
})
