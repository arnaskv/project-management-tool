import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Workflow } from './Workflow'
import { Issue } from './Issue'
import { Status } from './Status'

@Entity()
export class WorkflowStatus {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Workflow, (workflow) => workflow.statuses)
  workflow: Workflow

  @ManyToOne(() => Issue, (issue) => issue.workflowStatus)
  issues: Issue[]

  @ManyToOne(() => Status, (status) => status.workflowStatuses)
  status: Status
}
