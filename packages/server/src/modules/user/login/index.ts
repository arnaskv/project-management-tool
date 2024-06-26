import bcrypt from 'bcrypt'
import config from '@server/config'
import { z } from 'zod'
import jsonwebtoken from 'jsonwebtoken'
import { publicProcedure } from '@server/trpc'
import { User } from '@server/entities'
import { TRPCError } from '@trpc/server'
import { prepareTokenPayload } from '../tokenPayload'

const { expiresIn, tokenKey } = config.auth

export default publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    })
  )
  .mutation(async ({ input: { email, password }, ctx: { db } }) => {
    const user = (await db.getRepository(User).findOne({
      select: {
        id: true,
        password: true,
      },
      where: {
        email,
      },
    })) as Pick<User, 'id' | 'password'> | undefined

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'We could not find an account with this email address',
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Incorrect password. Try again.',
      })
    }

    const payload = prepareTokenPayload(user)

    const accessToken = jsonwebtoken.sign(payload, tokenKey, {
      expiresIn,
    })

    return {
      accessToken,
    }
  })
