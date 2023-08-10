import { expect, describe, it } from 'vitest'
import { RegisterOrgUseCase } from './registerOrg'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { string } from 'zod'

describe('RegisterOrg Use Case', () => {
  it('User passwords should be hashed upon registration.', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

    const { org } = await registerOrgUseCase.execute({
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
    const orgsRepository = new InMemoryOrgsRepository()
    const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

    const { org } = await registerOrgUseCase.execute({
      name: 'teste',
      address: 'endereco teste',
      email: 'teste@teste.com',
      password: '123456',
      whatsappNumber: '11999999999',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
