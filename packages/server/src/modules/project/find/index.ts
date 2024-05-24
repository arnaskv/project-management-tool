import { Project, type ProjectBare } from '@server/entities/Project'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure.query(
  async ({ ctx: { authUser, db } }) => {
    const projects = (await db.getRepository(Project).find({
      relations: ['users'],
      where: {
        users: { id: authUser.id },
      },
      order: { id: 'ASC' },
    })) as ProjectBare[]

    return projects
  }
)
