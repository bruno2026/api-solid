import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgalreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'
import { OrgAdminProfileError } from './errors/org-admin-profile-error'

interface GetProfileOrgUseCaseRequest {
  id: string
}

interface GetProfileOrgUseCaseResponse {
  org: Org
}

export class GetPRofileOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    id,
  }: GetProfileOrgUseCaseRequest): Promise<GetProfileOrgUseCaseResponse> {
    const org = await this.orgsRepository.findOrgById(id)

    if (org === null || org.isAdmin === false) {
      throw new OrgAdminProfileError() // Lança um erro se a ORG não for encontrada
    }

    return { org }
  }
}
