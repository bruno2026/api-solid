import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findPetById(id: string): Promise<Pet | null>
  findPetByCity(city: string): Promise<Pet[]>
  findPetsByCharacteristics(
    age?: number,
    energy_level?: number,
    size?: string,
    independence?: string,
  ): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
