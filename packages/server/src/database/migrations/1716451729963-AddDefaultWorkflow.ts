import { Status, Workflow, WorkflowStatus } from '@server/entities'
import { MigrationInterface, QueryRunner } from 'typeorm'

const defaultWorkflow = { name: 'Default' }
const defaultStatuses = [
  { name: 'To do' },
  { name: 'In progress' },
  { name: 'In review' },
  { name: 'Done' },
]

export class AddDefaultWorkflow1716451729963 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const statusRepository = queryRunner.manager.getRepository(Status)
    const workflowRepository = queryRunner.manager.getRepository(Workflow)
    const workflowStatusRepository =
      queryRunner.manager.getRepository(WorkflowStatus)

    const statusEntities: Status[] = await Promise.all(
      defaultStatuses.map(async (status) => {
        let statusEntity = await statusRepository.findOne({
          where: { name: status.name },
        })

        if (!statusEntity) {
          statusEntity = statusRepository.create({ name: status.name })
          statusEntity = await statusRepository.save(statusEntity)
        }

        return statusEntity
      })
    )

    let workflow = await workflowRepository.findOne({
      where: { name: defaultWorkflow.name },
    })
    if (!workflow) {
      workflow = workflowRepository.create({ name: defaultWorkflow.name })
      workflow = await workflowRepository.save(workflow)
    }

    await Promise.all(
      statusEntities.map(async (status) => {
        const workflowStatusExists = await workflowStatusRepository.findOne({
          where: { workflow: { id: workflow.id }, status: { id: status.id } },
        })
        if (!workflowStatusExists) {
          const workflowStatus = workflowStatusRepository.create({
            workflow,
            status,
          })
          await workflowStatusRepository.save(workflowStatus)
        }
      })
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    const statusRepository = queryRunner.manager.getRepository(Status)
    const workflowRepository = queryRunner.manager.getRepository(Workflow)
    const workflowStatusRepository =
      queryRunner.manager.getRepository(WorkflowStatus)

    const workflow = await workflowRepository.findOne({
      where: { name: defaultWorkflow.name },
    })
    if (workflow) {
      await workflowRepository.delete(workflow.id)
    }

    await Promise.all(
      defaultStatuses.map(async (status) => {
        const statusFound = await statusRepository.findOne({
          where: { name: status.name },
        })
        if (statusFound) {
          const workflowStatuses = await workflowStatusRepository.find({
            where: { status: { id: statusFound.id } },
          })
          if (workflowStatuses.length === 0) {
            await statusRepository.delete(statusFound.id)
          }
        }
      })
    )
  }
}
