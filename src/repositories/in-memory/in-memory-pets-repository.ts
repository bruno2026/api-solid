import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: 'pet-1',
      name: data.name,
      breed: data.breed,
      age: data.age,
      energy_level: data.energy_level,
      independence: data.independence,
      size: data.size,
      description: data.description,
      city: data.city,
      orgId: 'org-1',
    }

    this.items.push(pet)

    return pet
  }
}
