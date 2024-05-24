import { Workflow } from '@server/entities'
import { Project, projectInsertSchema } from '@server/entities/Project'
import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'

export default publicProcedure
  .input(projectInsertSchema)
  .mutation(async ({ input: projectData, ctx: { db } }) => {
    const workflow = await db
      .getRepository(Workflow)
      .findOne({ where: { name: 'Default' } })

    if (!workflow) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Default workflow does not exist.',
      })
    }

    const project = await db.getRepository(Project).create({
      ...projectData,
      workflow,
    })

    const projectCreated = await db.getRepository(Project).save(project)

    return projectCreated
  })

// export default authenticatedProcedure
//   .input(projectInsertSchema)

//   .mutation(async ({ input: projectData, ctx: { authUser, db } }) => {
//     const project = {
//       ...projectData,
//       users: [authUser],
//     }

//     const projectCreated = await db.getRepository(Project).save(project)

//     return projectCreated
//   })
