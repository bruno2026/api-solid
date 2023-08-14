import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './registerPet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('RegisterOrg Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })
  it('Should be able register pet.', async () => {
    const { pet } = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
  })
  it('Should be able to find all the pets the in a city.', async () => {
    const city = 'jandira'
    await sut.execute({
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

    const pets = await petsRepository.findPetByCity(city)

    expect(Array.isArray(pets)).toBe(true)
  })
  it('Should be able to find all the pets based on their Characteristics.', async () => {
    await sut.execute({
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

    await sut.execute({
      name: 'pet teste3',
      breed: 'teste',
      age: 3,
      energy_level: 5,
      independence: 'MEDIUM',
      size: 'SMALL',
      description: 'descricao teste',
      city: 'jandira',
      orgId: 'org-1',
    })

    await sut.execute({
      name: 'pet teste2',
      breed: 'teste',
      age: 3,
      energy_level: 5,
      independence: 'LOW',
      size: 'SMALL',
      description: 'descricao teste',
      city: 'jandira',
      orgId: 'org-1',
    })

    const characteristics = {
      age: 3,
      energy_level: 5,
    }

    const filteredPets = await petsRepository.findPetsByCharacteristics(
      characteristics.age,
      characteristics.energy_level,
    )
    expect(Array.isArray(filteredPets)).toBe(true)
  })

  it('Should be able to visualize details about a pet.', async () => {
    const id = '2881d8a0-3891-11ee-be56-0242ac120002'
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
    const pet = await petsRepository.findPetById(id)
    expect(pet).toBe(pet)
  })
})
