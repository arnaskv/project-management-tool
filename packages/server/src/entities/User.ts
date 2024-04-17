import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IsEmail, MaxLength, MinLength } from 'class-validator'
import { Project } from './Project'
import { Issue } from './Issue'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @MaxLength(20)
  username: string

  @Column()
  @IsEmail()
  email: string

  @Column()
  @MinLength(8)
  @MaxLength(255)
  password: string

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable()
  projects: Project[]

  @OneToMany(() => Issue, (issue) => issue.reporter)
  createdIssues: Issue[]

  @ManyToMany(() => Issue, (issue) => issue.assignees)
  assignedIssues: Issue[]
}
