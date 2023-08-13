import { FastifyInstance } from 'fastify'
import { registerPet } from './controllers/registerPet'
import { registerOrg } from './controllers/registerOrg'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.post('/orgs', registerOrg)

  /** Authenticated */
  app.get('/me', profile)
}
