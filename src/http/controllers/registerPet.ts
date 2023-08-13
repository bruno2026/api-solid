import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-registerPet-use-case'
import { PetalreadyExistsError } from '@/use-cases/errors/pet-already-exists-error'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    breed: z.string(),
    age: z.number(),
    city: z.string(),
    energy_level: z.number(),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    size: z.enum(['SMALL', 'LARGE']),
    description: z.string(),
  })

  const {
    name,
    breed,
    age,
    city,
    energy_level,
    independence,
    size,
    description,
  } = registerBodySchema.parse(request.body)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()

    await registerPetUseCase.execute({
      name,
      breed,
      age,
      city,
      energy_level,
      independence,
      size,
      description,
    })
  } catch (error) {
    if (error instanceof PetalreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
