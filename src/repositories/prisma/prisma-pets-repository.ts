import { prisma } from '@/lib/prisma'
import { AnimalSize, IndependenceLevel, Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { PetalreadyExistsError } from '@/use-cases/errors/pet-already-exists-error'

export class PrismaPetsRepository implements PetsRepository {
  async findPetsByCharacteristics(
    age?: number,
    energy_level?: number,
    size?: AnimalSize,
    independence?: IndependenceLevel,
  ): Promise<Pet[]> {
    const prismaFilters: Prisma.PetWhereInput[] = []

    if (age !== undefined) {
      prismaFilters.push({ age })
    }

    if (energy_level !== undefined) {
      prismaFilters.push({ energy_level })
    }

    if (size !== undefined) {
      prismaFilters.push({ size })
    }

    if (independence !== undefined) {
      prismaFilters.push({ independence })
    }

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
