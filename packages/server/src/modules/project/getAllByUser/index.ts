import { Project } from '@server/entities'
import { ProjectBare } from '@server/entities/Project'
import { publicProcedure } from '@server/trpc'

export default publicProcedure.query(async ({ ctx: { db } }) => {
  const projects: ProjectBare[] = (await db
    .getRepository(Project)
    .find()) as ProjectBare[]

  return projects
})
