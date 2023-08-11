import { prisma } from '@/lib/prisma'
import { AnimalSize, IndependenceLevel, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findPetsByCharacteristics(
    age: number,
    energy_level: number,
    size: AnimalSize,
    independence: IndependenceLevel,
  ) {
    const filteredPets = await prisma.pet.findMany({
      where: {
        age,
        energy_level,
        size,
        independence,
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

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
