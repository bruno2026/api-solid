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
})
