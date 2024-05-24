import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'
import { validates } from '@server/utils/validation'
import { WorkflowStatus } from './WorkflowStatus'
import { WorkflowTransition } from './WorkflowTransition'

@Entity()
export class Status {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
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

export const statusSchema = validates<StatusBare>().with({
  id: z.number().int().positive(),
  name: z.string().min(1).max(20),
})

export const statusInsertSchema = statusSchema.omit({ id: true })

export type StatusInsert = z.infer<typeof statusInsertSchema>
