import { FastifyInstance } from 'fastify'
import { registerPet } from './controllers/registerPet'
import { registerOrg } from './controllers/registerOrg'

export async function appRoutes(app: FastifyInstance) {
  app.post('/pets', registerPet)
  app.post('/orgs', registerOrg)
}
