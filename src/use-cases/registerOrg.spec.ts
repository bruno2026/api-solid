import { expect, describe, it } from 'vitest'
import { RegisterOrgUseCase } from './registerOrg'
import { compare } from 'bcryptjs'

describe('RegisterOrg Use Case', () => {
  it('User passwords should be hashed upon registration.', async () => {
    const registerOrgUseCase = new RegisterOrgUseCase({
      async findByEmail(_email) {
        return null
      },

      async create(data) {
        return {
          id: 'org-1',
          name: data.name,
          address: data.address,
          whatsappNumber: data.whatsappNumber,
          email: data.email,
          password_hash: data.password_hash,
        }
      },
    })

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
})
