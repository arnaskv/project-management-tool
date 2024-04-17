import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { z } from 'zod'
import { validates } from '@server/utils/validation'
import { User } from './User'
import { Workflow } from './Workflow'
import { Issue } from './Issue'

@Entity()
export class Project {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  name: string

  @ManyToOne(() => Workflow, (workflow) => workflow.projects)
  workflow: Workflow

  @ManyToMany(() => User, (user) => user.projects)
  users: User[]

  @OneToMany(() => Issue, (issue) => issue.project)
  issues: Issue[]
}

export type ProjectBare = Omit<Project, 'workflow' | 'users' | 'issues'>

export const projectSchema = validates<ProjectBare>().with({
  id: z.number().int().positive(),
  name: z
    .string()
    .trim()
    .min(2, 'Project name must be at least 2 characters long')
    .max(100),
})

export const projectInsertSchema = projectSchema.omit({ id: true })

export type ProjectInsert = z.infer<typeof projectInsertSchema>
