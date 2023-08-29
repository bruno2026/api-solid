import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { OrgalreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-registerOrg-use-case'

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    address: z.string().nonempty(),
    cep: z.string(),
    whatsappNumber: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, address, cep, whatsappNumber, email, password } =
    registerOrgBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      name,
      email,
      password,
      cep,
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
