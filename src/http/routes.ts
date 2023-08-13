import { FastifyInstance } from 'fastify'
import { registerPet } from './controllers/registerPet'
import { registerOrg } from './controllers/registerOrg'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate)
  app.post('/orgs', registerOrg)
  app.post('/pets', registerPet)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
