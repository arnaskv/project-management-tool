// starts with the real database configuration
import supertest from 'supertest'
import createApp from '@server/app'
import { TestDatabase } from './utils/database'

beforeAll(async () => {
  await TestDatabase.start()
}, 60000)

afterAll(async () => {
  await TestDatabase.stop()
}, 60000)

it('should connect to test database', async () => {
  expect(TestDatabase.getDataSource().isInitialized).toBeTruthy()
})

it('can launch the app', async () => {
  const app = createApp(TestDatabase.getDataSource())
  await supertest(app).get('/health').expect(200, 'OK')
}, 60000)
