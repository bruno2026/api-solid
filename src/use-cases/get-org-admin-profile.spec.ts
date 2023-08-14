import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetPRofileOrgUseCase } from './get-org-admin-profile'

let orgsRepository: InMemoryOrgsRepository
let sut: GetPRofileOrgUseCase

describe('Get admin Profile', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetPRofileOrgUseCase(orgsRepository)
  })
  it('should be able get the profile org by id', async () => {
    const OrgID = '2881d8a0-3891-11ee-be56-0242ac120002'

    orgsRepository.items.push({
      id: '2881d8a0-3891-11ee-be56-0242ac120002',
      address: 'teste',
      email: 'email@teste',
      name: 'teste',
      password_hash: '123456',
      whatsappNumber: '999999999',
      isAdmin: false,
    })
    const org = await orgsRepository.findOrgById(OrgID)
    expect(org).toBe(org)
  })

  it('should not be able get the profile org where is not admin', async () => {
    const OrgID = '2881d8a0-3891-11ee-be56-0242ac120002'

    orgsRepository.items.push({
      id: '2881d8a0-3891-11ee-be56-0242ac120002',
      address: 'teste',
      email: 'email@teste',
      name: 'teste',
      password_hash: '123456',
      whatsappNumber: '999999999',
      isAdmin: false,
    })
    const org = await orgsRepository.findOrgById(OrgID)

    expect(org?.isAdmin).toBe(false)
  })
})
