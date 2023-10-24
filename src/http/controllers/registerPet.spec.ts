import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register pet', async () => {
    const response = await request(app.server).post('/pets').send({
      name: 'Marley2',
      breed: 'Jack Russel',
      age: 2,
      city: 'jandira',
      energy_level: 5,
      independence: 'LOW',
      size: 'SMALL',
      description: 'Cute and cuddly',
    })

    expect(response.statusCode).toEqual(201)
  })
})
