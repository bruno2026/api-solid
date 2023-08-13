import { prisma } from '@/lib/prisma'
import { AnimalSize, IndependenceLevel, Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { PetalreadyExistsError } from '@/use-cases/errors/pet-already-exists-error'

export class PrismaPetsRepository implements PetsRepository {
  async findPetsByCharacteristics(
    ...characteristics: Array<{ key: string; value: unknown }>
  ): Promise<Pet[]> {
    const prismaFilters: Prisma.PetWhereInput[] = characteristics.map(
      ({ key, value }) => {
        switch (key) {
          case 'age':
            return { age: value as number }
          case 'energy_level':
            return { energy_level: value as number }
          case 'size':
            return { size: value as AnimalSize }
          case 'independence':
            return { independence: value as IndependenceLevel }
          default:
            return {} // Ignorar chaves desconhecidas
        }
      },
    )

    const filteredPets = await prisma.pet.findMany({
      where: {
        AND: prismaFilters,
      },
    })

    return filteredPets
  }

  async findPetByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
      },
    })

    return pets
  }

  async findPetById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const existingPet = await prisma.pet.findFirst({
      where: {
        name: data.name,
        breed: data.breed,
        age: data.age,
        energy_level: data.energy_level,
        independence: data.independence,
        size: data.size,
        city: data.city,
      },
    })

    if (existingPet) {
      throw new PetalreadyExistsError()
    }
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
