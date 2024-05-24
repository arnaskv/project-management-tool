import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { z } from 'zod'
import { validates } from '@server/utils/validation'
import { Project } from './Project'
import { User } from './User'
import { WorkflowStatus } from './WorkflowStatus'

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  title: string

  @Column('text')
  description: string

  @ManyToOne(() => WorkflowStatus, (workflowStatus) => workflowStatus.issues)
  workflowStatus: WorkflowStatus

  @ManyToOne(() => User, (user) => user.createdIssues)
  reporter: User

  @ManyToMany(() => User, (user) => user.assignedIssues)
  assignees: User[]

  @ManyToOne(() => Project, (project) => project.issues)
  project: Project
}

export type IssueBare = Omit<
  Issue,
  'workflowStatus' | 'reporter' | 'assignees' | 'project'
>

export const issueSchema = validates<IssueBare>().with({
  id: z.number().int().positive(),
  title: z.string().trim().min(1).max(20),
  description: z.string().trim().min(1).max(255),
})

export const issueInsertSchema = issueSchema.omit({ id: true })

export type IssueInsert = z.infer<typeof issueInsertSchema>
