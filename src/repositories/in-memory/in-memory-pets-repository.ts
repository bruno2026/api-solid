import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findPetByCity(city: string) {
    return this.items.filter((pet) => pet.city === city)
  }

  async findPetsByCharacteristics(
    age?: number,
    energy_level?: number,
    independence?: string,
    size?: string,
  ) {
    const filteredPets = this.items.filter((pet) => {
      let matches = true

      if (age && pet.age !== age) {
        matches = false
      }

      if (energy_level && pet.energy_level !== energy_level) {
        matches = false
      }

      if (independence && pet.independence !== independence) {
        matches = false
      }

      if (size && pet.size !== size) {
        matches = false
      }

      return matches
    })

    return filteredPets
  }

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
