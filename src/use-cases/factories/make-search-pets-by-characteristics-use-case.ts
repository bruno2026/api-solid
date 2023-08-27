import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetByCharacteristicsUseCase } from '../search-pets-by-characteristics'

export function makeSearchPetByCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetByCharacteristicsUseCase(petsRepository)

  return useCase
}
