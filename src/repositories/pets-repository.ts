import { AnimalSize, IndependenceLevel, Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findPetByCity(city: string): Promise<Pet[]>
  findPetsByCharacteristics(
    age?: number,
    energy_level?: number,
    size?: AnimalSize,
    independence?: IndependenceLevel,
  ): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
