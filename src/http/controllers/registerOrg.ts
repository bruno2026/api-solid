import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterOrgUseCase } from '@/use-cases/registerOrg'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { OrgalreadyExistsError } from '@/use-cases/errors/org-already-exists-error'

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    address: z.string().nonempty(),
    whatsappNumber: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, address, whatsappNumber, email, password } =
    registerOrgBodySchema.parse(request.body)

  try {
    const orgsRepository = new PrismaOrgsRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

    await registerOrgUseCase.execute({
      name,
      email,
      password,
      address,
      whatsappNumber,
    })
  } catch (error) {
    if (error instanceof OrgalreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
