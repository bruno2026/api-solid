import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetPRofileOrgUseCase } from '../get-org-admin-profile'

export function makeGetOrgAdminPRofileUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const getOrgAdminPRofileUseCase = new GetPRofileOrgUseCase(orgsRepository)

  return getOrgAdminPRofileUseCase
}
