import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findPetByCity(city: string) {
    return this.items.filter((pet) => pet.city === city)
  }

  async findPetById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    return pet || null
  }

  async findPetsByCharacteristics(
    age?: number,
    energy_level?: number,
    size?: string,
    independence?: string,
  ): Promise<Pet[]> {
    const filteredPets = this.items.filter(
      (pet) =>
        (!age || pet.age === age) &&
        (!energy_level || pet.energy_level === energy_level) &&
        (!size || pet.size === size) &&
        (!independence || pet.independence === independence),
    )

    return filteredPets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
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
