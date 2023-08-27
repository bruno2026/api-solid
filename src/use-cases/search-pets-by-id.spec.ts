import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetByIdUseCase } from './search-pets-by-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetByIdUseCase

describe('SearchPetByID UseCase', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetByIdUseCase(petsRepository)
  })
  it('Should be able search pet by ID.', async () => {
    const createdPet = await petsRepository.create({
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

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('pet teste')
  })
  it('should not be able to get pet profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
