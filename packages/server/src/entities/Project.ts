import { MaxLength } from 'class-validator'
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { Workflow } from './Workflow'
import { Issue } from './Issue'

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @MaxLength(255)
  name: string

  @ManyToOne(() => Workflow, (workflow) => workflow.projects)
  workflow: Workflow

  @ManyToMany(() => User, (user) => user.projects)
  users: User[]

  @OneToMany(() => Issue, (issue) => issue.project)
  issues: Issue[]
}
