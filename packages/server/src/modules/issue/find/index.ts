import { Issue } from '@server/entities'
import { projectSchema } from '@server/entities/Project'
import { workflowStatusSchema } from '@server/entities/WorkflowStatus'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { z } from 'zod'

export default authenticatedProcedure
  .input(
    z.object({
      projectId: projectSchema.shape.id,
      workflowStatusId: workflowStatusSchema.shape.id,
    })
  )
  .query(async ({ input, ctx: { db } }) => {
    const issues = db.getRepository(Issue).find({
      relations: ['project'],
      where: {
        workflowStatus: { id: input.workflowStatusId },
        project: { id: input.projectId },
      },
    })

    return issues
  })
