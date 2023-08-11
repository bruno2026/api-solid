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
    const age = 3
    const energy_level = 5
    const independence = 'LOW'
    const size = 'SMALL'

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

    const pets = await petsRepository.findPetsByCharacteristics(
      age,
      energy_level,
      independence,
      size,
    )

    console.log(pets)

    expect(Array.isArray(pets)).toBe(true)
  })
})
