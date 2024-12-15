import type { FetchEmailRegister, FetchEmailRegisterRepository } from './db-fetch-email-register-protocols'

export class DbFetchEmailRegister implements FetchEmailRegister {
  private readonly fetchEmailRegisterRepository: FetchEmailRegisterRepository
  constructor (repository: FetchEmailRegisterRepository) {
    this.fetchEmailRegisterRepository = repository
  }

  async checkEmailAlreadyExist (email: string): Promise<boolean> {
    const checkEmailRegister = await this.fetchEmailRegisterRepository.checkEmailAlreadyExist(email)
    return checkEmailRegister
  }
}
