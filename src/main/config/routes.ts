import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  readdirSync(join(__dirname, '../routes'))
    .filter(filename => !filename.endsWith('.map'))
    .map(async filename => {
      (await import(`../routes/${filename}`)).default(router)
    })
  app.use(router)
}
