import { makeGetOrgAdminPRofileUseCase } from '@/use-cases/factories/make-get-org-admin-profile-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrgProfile = makeGetOrgAdminPRofileUseCase()

  const { org } = await getOrgProfile.execute({
    id: request.user.sub,
  })

  return reply.status(200).send({
    org: {
      ...org,
      password_hash: undefined,
    },
  })
}
