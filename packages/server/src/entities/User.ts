import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IsEmail } from 'class-validator'
import { z } from 'zod'
import { validates } from '@server/utils/validation'
import { Project } from './Project'
import { Issue } from './Issue'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column()
  password: string

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable()
  projects: Project[]

  @OneToMany(() => Issue, (issue) => issue.reporter)
  createdIssues: Issue[]

  @ManyToMany(() => Issue, (issue) => issue.assignees)
  assignedIssues: Issue[]
}

export type UserBare = Omit<
  User,
  'projects' | 'createdIssues' | 'assignedIssues'
>

export const userSchema = validates<UserBare>().with({
  id: z.number().int().positive(),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(64),
})

export const userInsertSchema = userSchema.omit({ id: true })

export type UserSchema = z.infer<typeof userInsertSchema>

export type AuthUser = Pick<User, 'id'>

export const authUserSchema = validates<AuthUser>().with({
  id: z.number().int().positive(),
})
