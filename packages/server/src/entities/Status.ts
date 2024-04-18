import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'
import { validates } from '@server/utils/validation'
import { WorkflowStatus } from './WorkflowStatus'
import { WorkflowTransition } from './WorkflowTransition'

@Entity()
export class Status {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @OneToMany(() => WorkflowStatus, (workflowStatus) => workflowStatus.status)
  workflowStatuses: WorkflowStatus[]

  @OneToMany(
    () => WorkflowTransition,
    (workflowTransition) => workflowTransition.fromStatus
  )
  fromTransitions: WorkflowTransition[]

  @OneToMany(
    () => WorkflowTransition,
    (workflowTransition) => workflowTransition.toStatus
  )
  toTransitions: WorkflowTransition[]
}

export type StatusBare = Omit<
  Status,
  'workflowStatuses' | 'fromTransitions' | 'toTransitions'
>

export const issueTypeSchema = validates<StatusBare>().with({
  id: z.number().int().positive(),
  name: z.string().min(2).max(20),
})

export const StatusInsertable = issueTypeSchema.omit({ id: true })

export type StatusInsert = z.infer<typeof StatusInsertable>
