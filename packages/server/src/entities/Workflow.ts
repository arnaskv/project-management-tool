import { MaxLength } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Project } from './Project'

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @MaxLength(255)
  name: string

  @OneToMany(() => Project, (project) => project.workflow)
  projects: Project[]
}
