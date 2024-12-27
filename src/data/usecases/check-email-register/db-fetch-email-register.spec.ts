import { DbFetchEmailRegister } from './db-fetch-email-register'
import type { FetchEmailRegisterRepository } from './db-fetch-email-register-protocols'

interface SutTypes {
  sut: DbFetchEmailRegister
  fetchEmailRegisterRepositoryStub: FetchEmailRegisterRepository
}

const makeFetchEmailRegisterRepository = (): FetchEmailRegisterRepository => {
  class FetchEmailRegisterRepositoryStub implements FetchEmailRegisterRepository {
    async checkEmailAlreadyExist (registerEmail: string): Promise<boolean> {
      return new Promise(resolve => { resolve(true) })
    }
  }
  return new FetchEmailRegisterRepositoryStub()
}

const makeSut = (): SutTypes => {
  const fetchEmailRegisterRepositoryStub = makeFetchEmailRegisterRepository()
  const sut = new DbFetchEmailRegister(fetchEmailRegisterRepositoryStub)
  return {
    sut, fetchEmailRegisterRepositoryStub
  }
}

describe('DbFetchEmailRegister UseCase', () => {
  test('Should return true if email already used', async () => {
    const { sut } = makeSut()

    const account = await sut.checkEmailAlreadyExist('teste@teste.com')

    expect(account).toEqual(true)
  })
})
