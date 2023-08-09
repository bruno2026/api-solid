import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    breed: z.string(),
    age: z.number(),
    energy_level: z.number(),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    size: z.enum(['SMALL', 'LARGE']),
    description: z.string(),
  })

  // eslint-disable-next-line camelcase
  const { name, breed, age, energy_level, independence, size, description } =
    registerBodySchema.parse(request.body)

  await prisma.pet.create({
    data: {
      name,
      breed,
      age,
      // eslint-disable-next-line camelcase
      energy_level,
      independence,
      size,
      description,
    },
  })

  return reply.status(201).send()
}
