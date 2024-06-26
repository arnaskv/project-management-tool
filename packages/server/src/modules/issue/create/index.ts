import z from 'zod'
import { Issue, Project, User, WorkflowStatus } from '@server/entities'
import { issueInsertSchema } from '@server/entities/Issue'
import { projectSchema } from '@server/entities/Project'
import { TRPCError } from '@trpc/server'
import { workflowStatusSchema } from '@server/entities/WorkflowStatus'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export const issueInputSchema = z.object({
  projectId: projectSchema.shape.id,
  workflowStatusId: workflowStatusSchema.shape.id,
  issueData: issueInsertSchema,
})

export default authenticatedProcedure
  .input(issueInputSchema)
  .mutation(async ({ input, ctx: { authUser, db } }) => {
    const project = await db
      .getRepository(Project)
      .findOne({ where: { id: input.projectId } })

    if (!project) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Project not found',
      })
    }

    const creator = await db
      .getRepository(User)
      .findOne({ where: { id: authUser.id } })

    if (!creator) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      })
    }

    const workflowStatus = await db
      .getRepository(WorkflowStatus)
      .findOne({ where: { id: input.workflowStatusId } })

    if (!workflowStatus) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Workflow status not found',
      })
    }

    const newIssue = db.getRepository(Issue).create({
      ...input.issueData,
      project,
      workflowStatus,
      creator,
    })

    const issueCreated = await db.getRepository(Issue).save(newIssue)

    return issueCreated
  })
