import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetByCharacteristicsUseCase } from './search-pets-by-characteristics'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetByCharacteristicsUseCase

describe('SearchPetsByCharacteristics UseCase', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetByCharacteristicsUseCase(petsRepository)
  })
  it('Should be able search pet by Characteristics.', async () => {
    petsRepository.items.push({
      id: '2881d8a0-3891-11ee-be56-0242ac120002',
      name: 'pet teste',
      breed: 'teste',
      age: 2,
      energy_level: 5,
      independence: 'LOW',
      size: 'SMALL',
      description: 'descricao teste',
      city: 'jandira',
      orgId: 'org-1',
    })

    petsRepository.items.push({
      id: '2881d8a0-3891-11ee-be56-0242ac120002',
      name: 'pet teste2',
      breed: 'teste2',
      age: 2,
      energy_level: 5,
      independence: 'LOW',
      size: 'SMALL',
      description: 'descricao teste',
      city: 'jandira',
      orgId: 'org-1',
    })

    const characteristics = {
      age: 2,
      energy_level: 5,
      size: 'SMALL',
      independence: 'LOW',
    }

    const arrayPets = await sut.execute(characteristics)

    expect(Array.isArray(arrayPets.pet)).toBe(true)
    expect(arrayPets.pet.length).toBeGreaterThan(0)
  })
})
