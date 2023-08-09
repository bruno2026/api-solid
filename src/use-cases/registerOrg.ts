import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgalreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'

interface RegisterOrgUseCaseRequest {
  name: string
  address: string
  whatsappNumber: string
  email: string
  password: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    address,
    whatsappNumber,
    email,
    password,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgalreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      address,
      whatsappNumber,
      email,
      password_hash,
    })

    return {
      org,
    }
  }
}
