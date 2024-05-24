import { Project, projectSchema } from '@server/entities/Project'
import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'

export default publicProcedure
  .input(projectSchema.shape.id)
  .query(async ({ input: projectId, ctx: { db } }) => {
    const project = await db.getRepository(Project).findOne({
      where: { id: projectId },
      relations: [
        'issues',
        'workflow',
        'workflow.statuses',
        'workflow.statuses.status',
      ],
    })

    if (!project) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Project was not found`,
      })
    }

    return project
  })

// export default authenticatedProcedure
//   .input(projectSchema.shape.id)
//   .query(async ({ input: projectId, ctx: { authUser, db } }) => {
//     const project = (await db.getRepository(Project).findOne({
//       where: { id: projectId },
//     })) as ProjectBare

//     if (!project) {
//       throw new TRPCError({
//         code: 'NOT_FOUND',
//         message: `Project was not found`,
//       })
//     }

//     const isAssigned = await db.getRepository('project_users').exists({
//       where: { project_id: projectId, user_id: authUser.id },
//     })

//     if (!isAssigned) {
//       throw new TRPCError({
//         code: 'FORBIDDEN',
//         message: `You are not allowed to access this project.`,
//       })
//     }

//     return project
//   })
