import { AnimalSize, IndependenceLevel, Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  name: string
  breed: string
  age: number
  energy_level: number
  independence: IndependenceLevel
  size: AnimalSize
  description: string
  city: string
  orgId?: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    breed,
    age,
    energy_level,
    independence,
    size,
    description,
    city,
    orgId,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      breed,
      age,
      energy_level,
      independence,
      size,
      description,
      city,
      orgId,
    })

    return {
      pet,
    }
  }
}
