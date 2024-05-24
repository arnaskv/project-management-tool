import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'
import { validates } from '@server/utils/validation'
import { Workflow } from './Workflow'
import { Issue } from './Issue'
import { Status } from './Status'

@Entity()
export class WorkflowStatus {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Workflow, (workflow) => workflow.statuses)
  workflow: Workflow

  @OneToMany(() => Issue, (issue) => issue.workflowStatus)
  issues: Issue[]

  @ManyToOne(() => Status, (status) => status.workflowStatuses)
  status: Status
}

export type WorkflowStatusBare = Omit<
  WorkflowStatus,
  'workflow' | 'issues' | 'status'
>

export const workflowStatusSchema = validates<WorkflowStatusBare>().with({
  id: z.number().int().positive(),
})
