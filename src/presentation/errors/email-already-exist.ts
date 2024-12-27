export class EmailAlreadyExist extends Error {
  constructor (param: string) {
    super(`Email already exist: ${param}`)
    this.name = 'InvalidParamError'
  }
}
