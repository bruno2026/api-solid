import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetByCityUseCase } from '../search-pets-by-city'

export function makeSearchPetByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetByCityUseCase(petsRepository)

  return useCase
}
