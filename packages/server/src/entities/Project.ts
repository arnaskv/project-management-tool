import {
  Column,
  Entity,
  JoinTable,
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

  @Column('text')
  name: string

  @ManyToOne(() => Workflow, (workflow) => workflow.projects)
  workflow: Workflow

  @ManyToMany(() => User, { cascade: ['insert', 'update'] })
  @JoinTable({
    name: 'project_users',
    joinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
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
    .min(1, 'Project name must be at least 1 character long')
    .max(20),
})

export const projectInsertSchema = projectSchema.omit({ id: true })

export type ProjectInsert = z.infer<typeof projectInsertSchema>
