import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetPRofileOrgUseCase } from './get-org-admin-profile'

let orgsRepository: InMemoryOrgsRepository
let sut: GetPRofileOrgUseCase

describe('Get admin Profile', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetPRofileOrgUseCase(orgsRepository)
  })
  it('should not be able get the profile where org is not admin', async () => {})
})
