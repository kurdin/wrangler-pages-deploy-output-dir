import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { z } from 'zod'

import { PrismaClientMiddleware } from './middlewares'

const app = new Hono().use(PrismaClientMiddleware).basePath('/api')

const helloRoute = app.get(
  '/hello',
  zValidator(
    'query',
    z.object({
      name: z.string(),
    })
  ),
  async c => {
    const { name } = c.req.valid('query')
    // const user = await c.get('prisma').user.findFirst()
    // console.log(user)
    return c.json({
      message: `Hello! ${name}!`,
    })
  }
)

const goodbyeRoute = app.get(
  '/goodbye',
  zValidator(
    'query',
    z.object({
      name: z.string(),
    })
  ),
  c => {
    const { name } = c.req.valid('query')
    return c.json({
      message: `Goodbye! ${name}!`,
    })
  }
)

export type AppType = typeof helloRoute & typeof goodbyeRoute

export const onRequest = handle(app)
