import { join } from 'path'
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql'
import { DataSource } from 'typeorm'
import * as entities from '@server/entities'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

class TestDatabase {
  private static container: StartedPostgreSqlContainer

  private static dataSource: DataSource

  public static async start(): Promise<void> {
    this.container = await new PostgreSqlContainer()
      .withDatabase('test')
      .withUsername('test')
      .withPassword('test')
      .start()

    this.dataSource = new DataSource({
      type: 'postgres',
      host: this.container.getHost(),
      port: this.container.getPort(),
      username: this.container.getUsername(),
      password: this.container.getPassword(),
      database: this.container.getDatabase(),
      // migrations: [relative('../../src/database/migrations/**/*.ts')],
      namingStrategy: new SnakeNamingStrategy(),
      entities,
      synchronize: true,
      logging: false,
    })

    await this.dataSource.initialize()
  }

  public static async stop(): Promise<void> {
    if (this.dataSource) {
      await this.dataSource.destroy()
    }
    if (this.container) {
      await this.container.stop()
    }
  }

  public static getDataSource(): DataSource {
    return this.dataSource
  }
}

function relative(...paths: string[]) {
  return join(__dirname, ...paths)
}

export { TestDatabase }
