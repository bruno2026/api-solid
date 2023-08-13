export class PetalreadyExistsError extends Error {
  constructor() {
    super('Pet already exists')
  }
}
