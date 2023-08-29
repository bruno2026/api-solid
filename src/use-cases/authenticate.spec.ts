import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })
  it('should be able to authenticate.', async () => {
    await orgsRepository.create({
      name: 'ORG TESTE',
      email: 'teste@teste.com',
      cep: '06680103',
      password_hash: await hash('123456', 6),
      address: 'endereco teste',
      whatsappNumber: '99999999999',
    })

    const { org } = await sut.execute({
      email: 'teste@teste.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email.', async () => {
    await expect(() =>
      sut.execute({
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password.', async () => {
    await orgsRepository.create({
      name: 'ORG TESTE',
      email: 'teste@teste.com',
      cep: '06680103',
      password_hash: await hash('123456', 6),
      address: 'endereco teste',
      whatsappNumber: '99999999999',
    })

    await expect(() =>
      sut.execute({
        email: 'teste@teste.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
