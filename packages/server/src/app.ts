import express from 'express'
import {
  createExpressMiddleware,
  type CreateExpressContextOptions,
} from '@trpc/server/adapters/express'
import cors from 'cors'
import type { Database } from './database'
import { appRouter } from './modules'
import type { Context } from './trpc'

export default function createApp(db: Database) {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.use('/health', (_, res) => {
    res.status(200).send('OK')
  })

  app.use(
    '/v1/trpc',
    createExpressMiddleware({
      // Created context for each request, which we will be able to
      // access in our procedures.
      createContext: ({ req, res }: CreateExpressContextOptions): Context => ({
        // What we provide to our procedures under `ctx` key.
        db,
        req,
        res,
      }),

      router: appRouter,
    })
  )

  return app
}
