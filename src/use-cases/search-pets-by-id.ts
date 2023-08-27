import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchPetByIdUseCaseRequest {
  petId: string
}

interface SearchPetByIdCaseResponse {
  pet: Pet
}

export class SearchPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: SearchPetByIdUseCaseRequest): Promise<SearchPetByIdCaseResponse> {
    const pet = await this.petsRepository.findPetById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }
    return { pet }
  }
}
