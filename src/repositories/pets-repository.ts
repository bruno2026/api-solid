import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findPetById(id: string): Promise<Pet | null>
  findPetByCity(city: string): Promise<Pet[]>
  findPetsByCharacteristics(
    ...characteristics: Array<{ key: string; value: unknown }>
  ): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
