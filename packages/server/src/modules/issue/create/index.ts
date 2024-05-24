import z from 'zod'
import { Issue, Project, WorkflowStatus } from '@server/entities'
import { issueInsertSchema } from '@server/entities/Issue'
import { projectSchema } from '@server/entities/Project'
import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'
import { workflowStatusSchema } from '@server/entities/WorkflowStatus'

export const issueInputSchema = z.object({
  projectId: projectSchema.shape.id,
  workflowStatusId: workflowStatusSchema.shape.id,
  issueData: issueInsertSchema,
})

export default publicProcedure
  .input(issueInputSchema)
  .mutation(async ({ input, ctx: { db } }) => {
    const project = await db
      .getRepository(Project)
      .findOne({ where: { id: input.projectId } })

    if (!project) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Project not found',
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

    const newIssue = await db.getRepository(Issue).create({
      ...input.issueData,
      project,
      workflowStatus,
    })

    const issueCreated = await db.getRepository(Issue).save(newIssue)

    return issueCreated
  })

// export default authenticatedProcedure
//   .input(issueInsertSchema, projectSchema.shape.id)
//   .mutation(async ({ input: issueData, ctx: { authUser, db } }) => {
//     const project = await db
//       .getRepository(Project)
//       .findOne({ where: { id: projectId } })
//     const reporter = await db
//       .getRepository(User)
//       .findOne({ where: { id: authUser.id } })

//     if (!project) {
//       throw new TRPCError({
//         code: 'NOT_FOUND',
//         message: 'Project not found',
//       })
//     }

//     if (!isAssigned) {
//       throw new TRPCError({
//         code: 'FORBIDDEN',
//         message: `You are not allowed to access this project.`,
//       })
//     }

//     const issue = await db.getRepository(Issue).create({
//       ...issueData,
//       project,
//       reporter,
//     })

//     const issueCreated = await db.getRepository(Issue).save(issue)

//     return issueCreated
//   })
