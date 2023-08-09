export class OrgalreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists')
  }
}
