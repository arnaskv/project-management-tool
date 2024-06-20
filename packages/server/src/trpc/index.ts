import { initTRPC } from '@trpc/server'
import type { Request, Response } from 'express'
import type { AuthUser } from '@server/entities/User'
import type { Database } from '@server/database'
import SuperJSON from 'superjson'
import { ZodError } from 'zod'

export type Context = {
  db: Database
  req?: Request
  res?: Response
  authUser?: AuthUser
}

export type ContextMinimal = Pick<Context, 'db'>

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter(opts) {
    const { shape, error } = opts
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    }
  },
})

export const {
  middleware,
  router,
  procedure: publicProcedure,
  createCallerFactory,
  mergeRouters,
} = t
