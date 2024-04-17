import { MaxLength } from 'class-validator'
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Project } from './Project'
import { User } from './User'

@Entity()
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @MaxLength(255)
  title: string

  @Column()
  @MaxLength(255)
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
