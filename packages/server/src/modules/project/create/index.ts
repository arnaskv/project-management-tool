import { Workflow } from '@server/entities'
import { Project, projectInsertSchema } from '@server/entities/Project'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(projectInsertSchema)
  .mutation(async ({ input: projectData, ctx: { authUser, db } }) => {
    const workflow = await db
      .getRepository(Workflow)
      .findOne({ where: { name: 'Default' } })

    if (!workflow) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Default workflow does not exist.',
      })
    }

    const project = db.getRepository(Project).create({
      ...projectData,
      workflow,
      users: [authUser],
    })

    const projectCreated = await db.getRepository(Project).save(project)

    return projectCreated
  })
