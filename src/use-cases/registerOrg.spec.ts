import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterOrgUseCase } from './registerOrg'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgalreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('RegisterOrg Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })
  it('User passwords should be hashed upon registration.', async () => {
    const { org } = await sut.execute({
      name: 'teste',
      address: 'endereco teste',
      email: 'teste@teste.com',
      password: '123456',
      whatsappNumber: '11999999999',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should be able register org', async () => {
    const { org } = await sut.execute({
      name: 'teste',
      address: 'endereco teste',
      email: 'teste@teste.com',
      password: '123456',
      whatsappNumber: '11999999999',
    })

    expect(org.id).toEqual(expect.any(String))
  })
  it('should not be able register org already exists', async () => {
    await sut.execute({
      name: 'teste',
      address: 'endereco teste',
      email: 'teste@teste.com',
      password: '123456',
      whatsappNumber: '11999999999',
    })

    await expect(() =>
      sut.execute({
        name: 'teste',
        address: 'endereco teste',
        email: 'teste@teste.com',
        password: '123456',
        whatsappNumber: '11999999999',
      }),
    ).rejects.toBeInstanceOf(OrgalreadyExistsError)
  })
})
