import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

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

  await prisma.pet.create({
    data: {
      name,
      breed,
      city,
      age,
      energy_level,
      independence,
      size,
      description,
    },
  })

  return reply.status(201).send()
}
