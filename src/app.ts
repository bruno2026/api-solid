import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/pets', async (request, reply) => {
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
})
