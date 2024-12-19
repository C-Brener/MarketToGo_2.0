import type { LogsErrorRepository } from '../../data/protocols/logs-error-repository'
import { serverError, ok } from '../../presentation/helpers/http-helper'
import type { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LoggerControllerDecorator } from './logs'
import type { AccountModel } from '../../domain/models/account'

interface SutTypes {
  sut: LoggerControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogsErrorRepository
}

const makeFakeAccount = (): AccountModel => ({
  name: 'any_name',
  email: 'any@gmail.com',
  password: 'any_password',
  id: 'any_confirm_password',
  phoneNumber: '719999999'
})

const makeFakeRequest = {
  body: makeFakeAccount()
}

const makeFakeResponse = (): HttpResponse => (ok(makeFakeAccount()))

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise(resolve => resolve(makeFakeResponse()))
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): LogsErrorRepository => {
  class LogErrorRepositoryStub implements LogsErrorRepository {
    async logError (stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = makeLogErrorRepository()
  const sut = new LoggerControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest)
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest)
    expect(httpResponse).toEqual(makeFakeResponse())
  })

  test('Should call LogErrorRepository with ServerError', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)))

    await sut.handle(makeFakeRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
