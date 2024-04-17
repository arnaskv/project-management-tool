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

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  title: string

  @Column()
  description: string

  // @Column()
  // issueType: string

  // @Column()
  // status: string

  @ManyToOne(() => User, (user) => user.createdIssues)
  reporter: User

  @ManyToMany(() => User, (user) => user.assignedIssues)
  assignees: User[]

  @ManyToOne(() => Project, (project) => project.issues)
  project: Project
}

export type IssueBare = Omit<Issue, 'reporter' | 'assignees' | 'project'>

export const issueSchema = validates<IssueBare>().with({
  id: z.number().int().positive(),
  title: z.string().trim().min(2).max(20),
  description: z.string().trim().min(2).max(255),
})

export const insertIssueSchema = issueSchema.omit({ id: true })

export type IssueInsert = z.infer<typeof insertIssueSchema>
