import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []
  async findByEmail() {
    return null
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: 'org-1',
      name: data.name,
      address: data.address,
      whatsappNumber: data.whatsappNumber,
      email: data.email,
      password_hash: data.password_hash,
    }

    this.items.push(org)

    return org
  }
}
