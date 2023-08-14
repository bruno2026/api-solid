import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetByCharacteristicsUseCaseRequest {
  age: number
  energy_level: number
  size: string
  independence: string
}

interface SearchPetByCharacteristicsCaseResponse {
  pet: Pet[]
}

export class SearchPetByCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    energy_level,
    size,
    independence,
  }: SearchPetByCharacteristicsUseCaseRequest): Promise<SearchPetByCharacteristicsCaseResponse> {
    const pet = await this.petsRepository.findPetsByCharacteristics(
      age,
      energy_level,
      size,
      independence,
    )

    return {
      pet,
    }
  }
}
