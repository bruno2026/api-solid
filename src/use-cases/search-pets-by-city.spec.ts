import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetByCityUseCase } from './search-pets-by-city'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetByCityUseCase

describe('SearchPetByCity UseCase', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetByCityUseCase(petsRepository)
  })
  it('Should be able search pet by city.', async () => {
    const city = 'jandira'
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

    const arrayPets = await sut.execute({ city })

    expect(Array.isArray(arrayPets.pets)).toBe(true)
    expect(arrayPets.pets.length).toBeGreaterThan(0)
  })
})
