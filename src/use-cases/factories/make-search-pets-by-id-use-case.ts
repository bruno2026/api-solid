import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetByIdUseCase } from '../search-pets-by-id'

export function makeSearchPetByIdUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetByIdUseCase(petsRepository)

  return useCase
}
