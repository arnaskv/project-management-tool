import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'
import { validates } from '@server/utils/validation'
import { Project } from './Project'

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ unique: true })
  name: string

  @OneToMany(() => Project, (project) => project.workflow)
  projects: Project[]
}

export type WorkflowBare = Omit<Workflow, 'projects'>

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
