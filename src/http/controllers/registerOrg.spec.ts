import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register Org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'org cuidadores',
      address: 'endereco cuidadores',
      cep: '06680103',
      email: 'teste@teste.com',
      password: '123456',
      whatsappNumber: '11999999999',
    })

    expect(response.statusCode).toEqual(201)
  })
})
