import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'
import { validates } from '@server/utils/validation'
import { Project } from './Project'
import { WorkflowStatus } from './WorkflowStatus'
import { WorkflowTransition } from './WorkflowTransition'

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ unique: true })
  name: string

  @OneToMany(() => Project, (project) => project.workflow)
  projects: Project[]

  @OneToMany(() => WorkflowStatus, (workflowStatus) => workflowStatus.workflow)
  statuses: WorkflowStatus[]

  @OneToMany(
    () => WorkflowTransition,
    (workflowTransition) => workflowTransition.workflow
  )
  transitions: WorkflowTransition[]
}

export type WorkflowBare = Omit<
  Workflow,
  'projects' | 'statuses' | 'transitions'
>

export const workflowSchema = validates<WorkflowBare>().with({
  id: z.number().int().positive(),
  name: z
    .string()
    .trim()
    .min(2, 'Workflow name must be at least 2 characters long')
    .max(100),
})

export const InsertWorkflowSchema = workflowSchema.omit({ id: true })

export type InsertWorkflow = z.infer<typeof InsertWorkflowSchema>
