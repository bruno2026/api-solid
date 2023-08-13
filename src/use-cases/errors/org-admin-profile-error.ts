export class OrgAdminProfileError extends Error {
  constructor() {
    super('Org not found or is not admin')
  }
}
