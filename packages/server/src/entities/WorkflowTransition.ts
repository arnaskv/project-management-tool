import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Workflow } from './Workflow'
import { Status } from './Status'

@Entity()
export class WorkflowTransition {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Workflow, (workflow) => workflow.transitions)
  workflow: Workflow

  @ManyToOne(() => Status, (status) => status.fromTransitions)
  fromStatus: Status

  @ManyToOne(() => Status, (status) => status.toTransitions)
  toStatus: Status
}
