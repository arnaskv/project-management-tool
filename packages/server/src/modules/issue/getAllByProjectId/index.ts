import { Issue } from '@server/entities'
import { IssueBare } from '@server/entities/Issue'
import { projectSchema } from '@server/entities/Project'
import { publicProcedure } from '@server/trpc'

export default publicProcedure
  .input(projectSchema.shape.id)
  .query(async ({ input: projectId, ctx: { db } }) => {
    const issues = (await db.getRepository(Issue).find({
      where: {
        project: { id: projectId },
      },
      relations: ['project'],
    })) as IssueBare[]

    return issues
  })
