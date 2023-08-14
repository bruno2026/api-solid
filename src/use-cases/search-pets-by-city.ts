import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetByCityUseCaseRequest {
  city: string
}

interface SearchPetByCityCaseResponse {
  pets: Pet[]
}

export class SearchPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: SearchPetByCityUseCaseRequest): Promise<SearchPetByCityCaseResponse> {
    const pets = await this.petsRepository.findPetByCity(city)

    return {
      pets,
    }
  }
}
